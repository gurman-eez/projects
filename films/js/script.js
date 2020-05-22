/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
   
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    



    const img = document.querySelectorAll('.promo__adv img'),
        promoBg = document.querySelectorAll('.promo__bg'),
        promoGenre = document.querySelectorAll('.promo__genre'),
        promoInteractiveList = document.querySelector('.promo__interactive-list'),
        add = document.querySelector('form.add'),
        input = add.querySelector('.adding__input'),
        checkbox = add.querySelector('[type="checkbox"]');
        
    

        const remove = (obj) => {
            obj.forEach(item => {
                item.remove();
            });
        };
        

    const someChanges = () => {
        promoGenre[0].textContent = 'ДРАМА';

        promoBg[0].style.background = 'url("img/bg.jpg") center center/cover no-repeat';    
    };

    add.addEventListener('submit', (event) => {
        let newFilm = input.value,
              favorite = checkbox.checked;  
        event.preventDefault();
        if (newFilm) {
            if (newFilm.length > 21) {
               newFilm = `${newFilm.substring(0,22)}...`;
            } else if (favorite) {
                console.log("Добавляем любимый фильм");
            }
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            viewFilms(movieDB.movies, promoInteractiveList);  
        }
        event.target.reset();


    });

    const sortArr = (arr) => {
        arr.sort();
    };

      
    const viewFilms = (films, parent) => {
        parent.innerHTML = '';
        sortArr(films);
        films.forEach((film, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">${i + 1}. ${film}
                                    <div class="delete"></div>
                                </li>
            `;
        });
    
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
    
                viewFilms(films, parent);
            });
        });
    };

   
    

    
    remove(img);
    someChanges();
    viewFilms(movieDB.movies, promoInteractiveList);
    
    

});






    