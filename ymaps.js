window.onload = function () {

    let addressData;
    getData();

    function getData(){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'address-data.json', false);
        xhr.onload = function(){
            addressData = JSON.parse(this.response);
        }
        xhr.send();
    }

    // Дождёмся загрузки API и готовности DOM
    ymaps.ready(init);

    // Инициализация карты
    function init() {
        // Создание экземпляра карты и его привязка к контейнеру с заданным id ("map").
        myMap = new ymaps.Map('map', {
            center: [53.902496, 27.561481],
            zoom: [11],
            controls: ['zoomControl'],
            scroll: false
        });
        myMap.behaviors.disable('scrollZoom');

        placeAllMarks(); // Разместим все метки при загрузке карты
    }

    const buttons = document.querySelectorAll('.location-button');
    for (let button of buttons) {
        if(button.id == 'hide-all'){
            button.addEventListener('click', hideMarks);
        }else if(button.id == 'show-all'){
            button.addEventListener('click', placeAllMarks)
        }else{
            button.addEventListener('click', placeMarks)
        }
    }

    function placeMarks(e) {
        hideMarks();
        let id = e.target.id;
        let addressObj = addressData[id];
        // Помещаем метки на карту
        for (let address of addressObj) {
            let mark = new ymaps.Placemark(address.coordinates, address.properties, address.options);
            myMap.geoObjects.add(mark);
        }
    }

    function hideMarks(){
        myMap.geoObjects.removeAll(); // Очистим все метки
    }

    function placeAllMarks(){
        hideMarks();
        for(let key in addressData){
            for(let address of addressData[key]){
                let mark = new ymaps.Placemark(address.coordinates, address.properties, address.options);
                myMap.geoObjects.add(mark);
            }
        }
    }
}