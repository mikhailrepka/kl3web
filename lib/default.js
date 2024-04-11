/*!
 * WO Kit
 * development by Mike Repka
 * webberin.agency
 *
 * Licensed MIT for open source use
 *
 * https://getwokit.tech
 * Copyright 2023 Webberin
 */

/**
 * Toggles the menu by adding or removing the active class and data-active attribute.
 *
 * @function toggleMenu
 * @param {HTMLElement} btn - The button element to toggle the menu.
 * @returns {void}
 *
 * @description
 * This function checks the value of the data-active attribute of the button element.
 * If the value is not equal to 1, it sets the data-active attribute to 1 and adds the '--active' class.
 * If the value is equal to 1, it removes the data-active attribute and the '--active' class.
 */
function toggleMenu(btn) {
	if ($(btn).attr('data-active')!=1) {
		$(btn).attr('data-active',1);
		$(btn).addClass('--active');

		$("#bigmenu").addClass('--active');
	}
	else {
		$(btn).removeAttr('data-active');
		$(btn).removeClass('--active');

		$("#bigmenu").removeClass('--active');
	}
}

/**
 * Adjusts the height of elements with the class '__pict' based on the width of elements with the class '__catalog-card'.
 */
function resize() {
	let height = 0;
	$('.__catalog-card').each(function(){
		if (height == 0) {height = $(this).width()}
		$('.__catalog-card').find('.__pict').height(height);
		$('.__catalog-card').find('.__gallery').height(height + 8);
	});
	initSquareElems();
}

function initPackery() {
	LazyLoad.js('/assets/packery/packery.pkgd.min.js',function(){
		$('.__bigmenu > ul').packery({
			itemSelector: '.__bigmenu > ul > li',
			gutter: 0
		});
	});
}

function filterMenu() {
	let q = $('#menu-filter').val().toLowerCase();
	$('#bigmenu > ul > li').each(function(){
		let flag = 0;
		let $li = $(this);
		$(this).children('ul').children('li').each(function(){
			let minflag = 0;
			if (strstr($(this).text().toLowerCase(),q)) {
				flag = 1;
				minflag = 1;
			}
			if (q.length < 1) {
				flag = 1;
				minflag = 1;
			}
			if (minflag == 0) {$(this).hide()}
			else {$(this).show()}
		});
		if (flag == 0) {$li.hide()}
		else {$li.show()}
	});
	initPackery();
}

let carouselConfig = {
	cellAlign: 'left',
	contain: true,
	groupCells: 6,
	prevNextButtons: false,
	pageDots: false,
	wrapAround: true
};
let sectionsConfig = {
	cellAlign: 'left',
	contain: true,
	groupCells: 2,
	prevNextButtons: false,
	pageDots: true,
	wrapAround: true,
	autoPlay: true,
	autoPlay: 3000
};
function initFlickity() {
	LazyLoad.js('/assets/flickity/flickity.pkgd.min.js',function(){
		$('[data-slideshow]').flickity({
			cellAlign: 'left',
			contain: true,
			wrapAround: true,
			prevNextButtons: false,
			autoPlay: true,
			autoPlay: 3000
		});
		if ($(window).width() > 1024) {
			$('[data-carousel]').flickity(carouselConfig);
		}
		if ($(window).width() < 1024) {
			$('[data-sections-carousel]').flickity(sectionsConfig);
		}
		setTimeout(() => {
			$('[data-card-slideshow]').flickity({
				cellAlign: 'left',
				contain: true,
				wrapAround: true,
				prevNextButtons: true,
				pageDots: true
			});
		}, 1);
	});
}

function initUkiyo() {
	LazyLoad.js('/assets/ukiyo-js/ukiyo.min.js',function(){
		new Ukiyo("[data-parallax]");
	});
}

function burgetToggle() {
	let $burger = $('#burgerBtn');
	let $aside = $('aside');
	if ($burger.attr('data-active')!=1) {
		$burger.attr('data-active',1);
		$burger.addClass('--active');
		$aside.addClass('--active');
		$aside.attr('data-active',1);
	}
	else {
		$burger.removeAttr('data-active');
		$burger.removeClass('--active');
		$aside.removeClass('--active');
		$aside.removeAttr('data-active');
	}
}

function nav(el) {
	$('#bottombar a').removeClass('--active');
	$(el).addClass('--active');
}

function initChoicesJS() {
	const config = {
		itemSelectText: ''
	};
	LazyLoad.js('/assets/choices-js/9.0.1/choices.min.js',()=>{
		document.querySelectorAll('[data-choices]').forEach(element => {
			const choices = new Choices(element,config);
		});
	});
}

function initSelectize() {
	const config = {

	};

	LazyLoad.js('/assets/selectize/0.15.2/selectize.min.js',()=>{
		$("[data-selectize]").selectize(config);
	});	
}

var filterFlag = 0;
function filtersToggle(element) {
	if (!element.dataset.active) {
		filterFlag = 1;
		$('#header').removeClass('--hidden');
		$('#bottombar').addClass('--hidden');
		element.dataset.active = true;
		element.classList.add('--active');
		$(element).children('span').html($(element).attr('data-active-caption'));
		$("#filtered-flow").removeClass('__wo-col-m-12');
		$("#filtered-flow").addClass('__wo-col-m-8');
		$("#filtered-flow .__catalog-card").each(function(){
			$(this).removeClass('__wo-col-m-2');
			$(this).addClass('__wo-col-m-3');
		});
		$('#filters-panel').show();
		if ($(window).width()>1024) {
			initScrollFollow();
		}
		if ($(window).width() <= 1024) {

		}
	}
	else {
		filterFlag = 0;
		delete element.dataset.active;
		element.classList.remove('--active');
		$(element).children('span').html($(element).attr('data-default-caption'));
		$("#filtered-flow").removeClass('__wo-col-m-8');
		$("#filtered-flow").addClass('__wo-col-m-12');
		$("#filtered-flow .__catalog-card").each(function(){
			$(this).removeClass('__wo-col-m-3');
			$(this).addClass('__wo-col-m-2');
		});
		$('#filters-panel').hide();
		$('#header').removeClass('--hidden');
		$('#bottombar').removeClass('--hidden');
	}
}

function initScrollFollow() {
	LazyLoad.js('/assets/scroll-follow/jquery.simple-scroll-follow.min.js',function(){
		$('#filters-panel form').simpleScrollFollow({
			limit_elem: '.__cards-flow',
			upper_side: '#header'
		});
	});
}

function width2height(element) {
	$(element).height($(element).width());
}
function w2hByParent(element,target=null) {
	$(element).each(function(){
		if (target!=null) {
			width2height($(this).find(target));
		}
		else {
			width2height(this);
		}
	});
}

function initFancybox() {
	LazyLoad.css('/assets/fancyapps/fancybox.css',function(){
		LazyLoad.js('/assets/fancyapps/fancybox.umd.js',function(){
			LazyLoad.js('/assets/fancyapps/l10n/ru.umd.js',function(){
				Fancybox.bind('[data-fancybox]', {
					l10n: Fancybox.l10n.ru,
				}); 
			});
		});
	});
}

function initSquareElems() {
	document.querySelectorAll('[data-square]').forEach(element => {
		element.style.height = element.offsetWidth + 'px';
	});
}

function appInit() {
	LazyLoad.js('/assets/jquery-3.2.1/jquery.min.js',function(){
		$(window).on('resize',function(){
			resize();
			if ($(window).width() > 1024) {
				$('#header').css({'top':$('#topbar').height()+'px'});
				if (location.pathname == '/') {
					$('#items-carousel').flickity(carouselConfig);
					try {$('#sections-menu').flickity('destroy');} catch(e) {console.log('e: '+e)}
				}
				w2hByParent('#item-gallery','.__wo-pict-bg');
			}
			else {
				$('#header').css({'top':'0'});
				if (location.pathname == '/') {
					try {$('#items-carousel').flickity('destroy');} catch(e) {console.log('e: '+e)}
					$('#sections-menu').flickity(sectionsConfig);
				}
				w2hByParent('#item-gallery','.__wo-pict-bg');
			}
		});

		// $("#filtered-flow .__catalog-card").each(function(){
		// 	$(this).removeClass('__wo-col-m-2');
		// 	$(this).addClass('__wo-col-m-3');
		// });

		if ($(window).width() > 1024) {
			// $('body').append('<div class=\"__debug\" id=\"debug\"></div>');
			// $('#debug').html(debug);
			let last_scroll_top = 0;
			let direction = 'down';
			let top = 0;
			let stop = 0;
			let flag = 0;
			$(window).on('scroll',function(){
				let scroll_top = $(window).scrollTop();
				if (scroll_top > last_scroll_top) {direction='down'}
				else {direction='up'}
				last_scroll_top = scroll_top <= 0 ? 0 : scroll_top;
	
				let $topbar = $('#topbar');
				let $header = $('#header');
				let bigmenu = $('#bigmenu');
				let topbar_height = $topbar.height();
				let dash = 4;
	
				if (direction == 'down') {
					if (flag == 0 || flag == 'up') {
						flag = 'down';
						stop = scroll_top;
					}
					top = Math.round((scroll_top - stop) / dash);
					if (top < 0) top = 0;
					if (top > topbar_height) top = topbar_height;
					$topbar.css({'top':'-'+top+'px'});
					$header.css({'top':''+(topbar_height - top)+'px'});
					bigmenu.css({'top':'-'+(top)+'px'});
				}
				else if (direction == 'up') {
					if (flag == 0 || flag == 'down') {
						flag = 'up';
						stop = scroll_top;
					}
					top = Math.round((stop - scroll_top) / dash);
					top = topbar_height - top;
					if (top < 0) top = 0;
					if (top > topbar_height) top = topbar_height;
					if (scroll_top <= 0) top = 0;
					$topbar.css({'top':'-'+top+'px'});
					$header.css({'top':''+(topbar_height - top)+'px'});
					bigmenu.css({'top':'-'+(top)+'px'});
				}
			});
		}
		else {
			$('#header').css({'top':'0'});
			let last_scroll_top = 0;
			let direction = 'down';
			$(window).on('scroll',function(){
				let scroll_top = $(window).scrollTop();
				if (scroll_top > last_scroll_top) {direction='down'}
				else {direction='up'}
				last_scroll_top = scroll_top <= 0 ? 0 : scroll_top;

				let $header = $('#header');
				let $bottom = $('#bottombar');

				if (direction == 'down') {
					if ($('aside').attr('data-active')!=1 && $header.hasClass('--hidden')!=1) {
						$header.addClass('--hidden');
					}
					if (filterFlag == 0) {
						if ($bottom.hasClass('--hidden')!=1) {
							$bottom.addClass('--hidden');
						}
					}
				}
				else if (direction == 'up') {
					$header.removeClass('--hidden');
					if (filterFlag == 0) {
						$bottom.removeClass('--hidden');
					}
				}
			});
		}

		onInit();
		initSquareElems();
		initFlickity();
		initPackery();
		initDropDown();
		initWOModal();
		initUkiyo();
		initWOBtnColor();
		initSelectize();
		resize();
		try {
			assets.forEach(initFn => {
				if (window[initFn] instanceof Function) {
					window[initFn]();
				}
			});
		}
		catch(e){console.log('cant find assets')}
		// setTimeout(() => {}, 1);
	});
}

document.addEventListener("DOMContentLoaded", function (event) {
	appInit();
});