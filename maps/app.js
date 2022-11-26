let center = [42.983100, 47.504745];

ymaps.ready(function () {
    let myMap = new ymaps.Map('map', {
        center: center,
        zoom: 9,
        // Добавим панель маршрутизации.
        controls: ['routePanelControl', 'smallMapDefaultSet']
    });

    let control = myMap.controls.get('routePanelControl');

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    let lat = 0;
    let long = 0;

    function success(pos) {
        const crd = pos.coords;

        // console.log('Your current position is:');
        // console.log(`Latitude : ${}`);
        // console.log(`Longitude: ${}`);
        // console.log(`More or less ${crd.accuracy} meters.`);
        // lat = crd.longitude
        // long = crd.longitude

        let reversGeocoder = ymaps.geocode([crd.latitude, crd.longitude]);
        let locationText = null;
        reversGeocoder.then(function(res) {
            locationText = res.geoObjects.get(0).properties.get('text');

            // Зададим состояние панели для построения машрутов.
            control.routePanel.state.set({
                // Тип маршрутизации.
                type: 'masstransit',
                // Выключим возможность задавать пункт отправления в поле ввода.
                fromEnabled: true,
                // Адрес или координаты пункта отправления.
                from: locationText,
                // Включим возможность задавать пункт назначения в поле ввода.
                toEnabled: true
                // Адрес или координаты пункта назначения.
                //to: 'Петербург'
            });

            price1.onclick = function() {
                control.routePanel.state.set({
                    // Тип маршрутизации.
                    type: 'masstransit',
                    // Выключим возможность задавать пункт отправления в поле ввода.
                    fromEnabled: true,
                    // Адрес или координаты пункта отправления.
                    from: locationText,
                    // Включим возможность задавать пункт назначения в поле ввода.
                    toEnabled: true,
                    // Адрес или координаты пункта назначения.
                    to: [42.385583, 46.971763]
                });
            };

            price2.onclick = function() {
                control.routePanel.state.set({
                    // Тип маршрутизации.
                    type: 'masstransit',
                    // Выключим возможность задавать пункт отправления в поле ввода.
                    fromEnabled: true,
                    // Адрес или координаты пункта отправления.
                    from: locationText,
                    // Включим возможность задавать пункт назначения в поле ввода.
                    toEnabled: true,
                    // Адрес или координаты пункта назначения.
                    to: [43.033058, 47.257209]
                });
            };

            price3.onclick = function() {
                control.routePanel.state.set({
                    // Тип маршрутизации.
                    type: 'masstransit',
                    // Выключим возможность задавать пункт отправления в поле ввода.
                    fromEnabled: true,
                    // Адрес или координаты пункта отправления.
                    from: locationText,
                    // Включим возможность задавать пункт назначения в поле ввода.
                    toEnabled: true,
                    // Адрес или координаты пункта назначения.
                    to: [43.017369, 46.824434]
                });
            };
        })

        console.log(locationText)

        // Зададим опции панели для построения машрутов.
        control.routePanel.options.set({
            // Запрещаем показ кнопки, позволяющей менять местами начальную и конечную точки маршрута.
            allowSwitch: false,
            // Включим определение адреса по координатам клика.
            // Адрес будет автоматически подставляться в поле ввода на панели, а также в подпись метки маршрута.
            reverseGeocoding: true,
            // Зададим виды маршрутизации, которые будут доступны пользователям для выбора.
            types: { masstransit: true, pedestrian: true, taxi: true, bicycle: true }
        });
    }

    let price1 = document.getElementById('price_1')
    let price2 = document.getElementById('price_2')
    let price3 = document.getElementById('price_3')

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

    // Создаем кнопку, с помощью которой пользователи смогут менять местами начальную и конечную точки маршрута.
    let switchPointsButton = new ymaps.control.Button({
        data: {content: "Поменять местами", title: "Поменять точки местами"},
        options: {selectOnClick: false, maxWidth: 160}
    });
    // Объявляем обработчик для кнопки.
    switchPointsButton.events.add('click', function () {
        // Меняет местами начальную и конечную точки маршрута.
        control.routePanel.switchPoints();
    });
    myMap.controls.add(switchPointsButton);
});

