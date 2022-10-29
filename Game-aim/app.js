const startBtn = document.querySelector('#start')
//Получаем кнопку чтобы дать ей евент по клику

const screens = document.querySelectorAll('.screen')
//Получаем все экраны

const timeList = document.querySelector('#time-list')
//Получаем кнопки 10,20,30 сек

const timeEl = document.querySelector('#time')
//Получаем доступ к значению времени сколько Осталось

const board = document.querySelector('#board')
//Получаем чтобы доступ к доске,чтобы внутрь ее(в html) поместить div circle

const colors = ['#faf4ee' , '#00FF29' , '#FF0000', '#ffffff' , '#00E0FF' ,'#FF6B00' , '#d99830' , '#3d9776' , '#0c695d' , '#e8a631', '#606b6f' , '#ca3542' ,'#61c250' , '#bed600' , '#47d5cd',  '#cae3e9' , '#001AFF', '#FA00FF' , ] //набор цветов


let time = 0
let score = 0



startBtn.addEventListener('click' , (event) => {
    event.preventDefault() //Удаляем переход по страницам(#)
    screens[0].classList.add('up') //Переход к следующему экрану
}) //Добавили события по клику

timeList.addEventListener('click' , event =>
{
    if (event.target.classList.contains
    ('time-btn')) {
        time = parseInt(event.target.
        getAttribute('data-time')) //получаем значение data-time
        screens[1].classList.add('up') //Переход на следующий экран
        startGame()
    }
})//Обрабатываем каждую кнопку с помощью делегирования события
//event.target - тот элемент по которому кликнули
//contains проверяет если у этого объекта определенный класс

board.addEventListener('click' , event => {
    if (event.target.classList.contains
    ('circle')) {
        score++
        event.target.remove() //при клике уберем кружок
        createRandomCircle() //создаем новый
    } //При нажатии на кружок
})



function startGame() {
    setInterval(decreaseTime , 1000) //Задаем таймер
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if(time === 0) {
        finishGame()
    } else {
        let current = --time //текущее время
        if (current <10){
        current = `0${current}` //добавляем 0 когда остается меньше 10сек
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`
} //Строчка со счетом в конце игры , Спан и класс для подсвечивания

function createRandomCircle() {
    const circle = document.createElement
    ('div') //Указываем что это div

    const size = getRandomNumber(10 , 60)

    const {width, height} = board.getBoundingClientRect() //Получим значения width и height

    //Делаем рандомное положение(-size) чтобы был не больше 500(грань поля)
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    setColor(circle)

    circle.classList.add('circle') //Добавляем класс
    circle.style.width = `${size}px` //width = случайный размер от 10 до 60 +px
    circle.style.height = `${size}px`//height = случайный размер от 10 до 60 +px
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle) //вставляем div circle в div board
} //Создание рандомных шариков

function getRandomNumber(min , max) {
    return Math.round(Math.random() * (max - min) +min)
} //Задаем рандомные значения(они для рандомного размера шарика)
//Math.round округляет значения

function setColor(element) {
    const color = getRandomColor() //Сначало получим цвет
    element.style.background = color // а потом передадим сюда
} //рандомный цвет

function getRandomColor() {
    const index = Math.floor(Math.random() *colors.length)
    return colors[index]
}
