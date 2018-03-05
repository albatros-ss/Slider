"use strict";

(function( $ ){

	$.fn.mySlider = function(options) {

		let counter = 1;
		let flag = true;
		let timerInt;

		const con = $('.slider-container');
		const settings = $.extend( {
      		transition : 1000,
      		speed : 4000,
      		reverse : false,
      		autoplay : false,
     		quantImgShow : 2
    	}, options);

	    //Добавляем копии эллементов
	    for (var i = 0; i < settings.quantImgShow; i++) {
	    	con.append(con.children('li').eq(2*i).clone());
	    	i++
	    	con.prepend(con.children('li').eq(-2*i).clone());
	    	i--
	    }
	    //Создаем файл обёртки и управления
	    con.wrapAll("<div id='slider-wrap'></div>");

	    const wrap = $('#slider-wrap');
		let width = wrap.width();

		wrap.append('<div id="prevSlide" class="button">prev</div>');
		wrap.append('<div id="nextSlide" class="button">next</div>');
		const nextSlider = $('#nextSlide');
		const prevSlider = $('#prevSlide');

		//Узнаем длинну цепочки
		const quantImg = con.children('li').length; 

	    //Устанавливаем ширину картинок
	    const img = wrap.find('img');
		img.width(width/settings.quantImgShow);
		let widthImg = wrap.find('img:first').width();

		//Задаем начальное смещение
		con.css({
	            'transform': 'translateX(-' + widthImg*settings.quantImgShow + 'px)'
	    });

		//Отменяем выделение текста при двойном щелчке
		wrap.mousedown(function() {
			return false;
		});

		//Установим обработчик события resize
		$(window).resize(function(){

			width = wrap.width();

			img.width(width/settings.quantImgShow);
			widthImg = img.filter(':first').width();

			con.css({
				'transform': 'translateX(-' + widthImg*(counter + settings.quantImgShow -1) + 'px)',
				'transition': ''
			});
		});

		if(settings.autoplay) {
			autoSlide(); //Запускаем автопромотку
		}

		// Функция автопромотки
		function autoSlide() {
			if (settings.reverse) {
				timerInt = setInterval(showPrevSlide, settings.speed);
			}
			else {
				timerInt = setInterval(showNextSlide, settings.speed);
			}
		};


		nextSlider.click(function() {
			clearInterval(timerInt); //Останавливаем автопромотку
			showNextSlide();
			if(settings.autoplay) {
				autoSlide(); //Запускаем автопромотку
			}
		});

		prevSlider.click(function() {
			clearInterval(timerInt); //Останавливаем автопромотку
			showPrevSlide() ;
			if(settings.autoplay) {
				autoSlide(); //Запускаем автопромотку
			}
		});


		function showNextSlide() {

			if (flag) {
				
				flag = false;
				con.css({
		                'transform': 'translateX(-' + widthImg*(settings.quantImgShow + counter) + 'px)',
		                'transition': settings.transition + 'ms'
		            });

				counter++

				if (counter == (quantImg - 2*settings.quantImgShow) + 1) {

					counter = 1;

					setTimeout(function() {
						con.css({
			                'transform': 'translateX(-' + widthImg*settings.quantImgShow + 'px)',
			                'transition': ''
		            	});

		            	flag = true;
					}, settings.transition);
				}

				else {
					setTimeout(function() { 
						flag = true;
					}, settings.transition);
				};
			};

		};

		function showPrevSlide() { 

			if (flag) {
				flag = false;
				
				con.css({
		                'transform': 'translateX(-' + widthImg*(counter + settings.quantImgShow -2) + 'px)',
		                'transition': settings.transition + 'ms'
		            });

				counter--

				if (counter  == -settings.quantImgShow + 1) {

					counter = (quantImg - 3*settings.quantImgShow + 1);
					console.log(counter);

					setTimeout(function() {
						con.css({
			                'transform': 'translateX(-' + widthImg * (quantImg - 2*settings.quantImgShow) + 'px)',
			                'transition': ''
		            	});
		            	flag = true;
		            	
					}, settings.transition);
				}
				else {
					setTimeout(function() { 
						flag = true;
					}, settings.transition);
				};
			};

		};
  


  	};
})( jQuery );


jQuery(function($) {

	$('.slider-container').mySlider({});

});