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

"use strict";

// LazyLoad JS or CSS file loader
let LazyLoad=function(e){function t(t,n){var s,c=e.createElement(t);for(s in n)n.hasOwnProperty(s)&&c.setAttribute(s,n[s]);return c}function n(e){var t,n,s=i[e];s&&(t=s.callback,n=s.urls,n.shift(),u=0,n.length||(t&&t.call(s.context,s.obj),i[e]=null,f[e].length&&c(e)))}function s(){var t=navigator.userAgent;o={async:e.createElement("script").async===!0},(o.webkit=/AppleWebKit\//.test(t))||(o.ie=/MSIE|Trident/.test(t))||(o.opera=/Opera/.test(t))||(o.gecko=/Gecko\//.test(t))||(o.unknown=!0)}function c(c,u,h,g,d){var y,p,b,k,m,v,j=function(){n(c)},w="css"===c,T=[];if(o||s(),u)if(u="string"==typeof u?[u]:u.concat(),w||o.async||o.gecko||o.opera)f[c].push({urls:u,callback:h,obj:g,context:d});else for(y=0,p=u.length;p>y;++y)f[c].push({urls:[u[y]],callback:y===p-1?h:null,obj:g,context:d});if(!i[c]&&(k=i[c]=f[c].shift())){for(l||(l=e.head||e.getElementsByTagName("head")[0]),m=k.urls.concat(),y=0,p=m.length;p>y;++y)v=m[y],w?b=o.gecko?t("style"):t("link",{href:v,rel:"stylesheet"}):(b=t("script",{src:v}),b.async=!1),b.className="lazyload",b.setAttribute("charset","utf-8"),o.ie&&!w&&"onreadystatechange"in b&&!("draggable"in b)?b.onreadystatechange=function(){/loaded|complete/.test(b.readyState)&&(b.onreadystatechange=null,j())}:w&&(o.gecko||o.webkit)?o.webkit?(k.urls[y]=b.href,r()):(b.innerHTML='@import "'+v+'";',a(b)):b.onload=b.onerror=j,T.push(b);for(y=0,p=T.length;p>y;++y)l.appendChild(T[y])}}function a(e){var t;try{t=!!e.sheet.cssRules}catch(s){return u+=1,void(200>u?setTimeout(function(){a(e)},50):t&&n("css"))}n("css")}function r(){var e,t=i.css;if(t){for(e=h.length;--e>=0;)if(h[e].href===t.urls[0]){n("css");break}u+=1,t&&(200>u?setTimeout(r,50):n("css"))}}var o,l,i={},u=0,f={css:[],js:[]},h=e.styleSheets;return{css:function(e,t,n,s){c("css",e,t,n,s)},js:function(e,t,n,s){c("js",e,t,n,s)}}}(this.document);

/**
 * Replaces all occurrences of a search string with a replacement string in a given subject string.
 *
 * @param {string|string[]} search - The search string or an array of search strings.
 * @param {string|string[]} replace - The replacement string or an array of replacement strings.
 * @param {string|string[]} subject - The subject string or an array of subject strings.
 * @returns {string|string[]} - The modified subject string or an array of modified subject strings.
 */
function str_replace(search,replace,subject){if(!(replace instanceof Array)){replace=new Array(replace);if(search instanceof Array){while(search.length>replace.length){replace[replace.length]=replace[0]}}}if(!(search instanceof Array))search=new Array(search);while(search.length>replace.length){replace[replace.length]=''}if(subject instanceof Array){for(k in subject){subject[k]=str_replace(search,replace,subject[k])}return subject}for(var k=0;k<search.length;k++){var i=subject.indexOf(search[k]);while(i>-1){subject=subject.replace(search[k],replace[k]);i=subject.indexOf(search[k],i)}}return subject}

/**
 * Returns the portion of a string that occurs after a specified substring.
 *
 * @param {string} haystack - The string to search within.
 * @param {string} needle - The substring to search for.
 * @param {boolean} bool - Determines the behavior of the function.
 *                         If true, returns the portion of the string before the first occurrence of the substring.
 *                         If false, returns the portion of the string starting from the first occurrence of the substring.
 * @returns {string|boolean} - The portion of the string or false if the substring is not found.
 */
function strstr(haystack, needle, bool) { var pos = 0; haystack += ""; pos = haystack.indexOf(needle); if (pos == -1) { return false; } else { if (bool) { return haystack.substr(0, pos); } else { return haystack.slice(pos); } }
}

/**
 * Toggles the visibility and position of a dropdown element relative to a specified element.
 *
 * @param {HTMLElement} elem - The element that triggers the dropdown toggle.
 * @param {string} dropid - The ID of the dropdown element to toggle.
 * @returns {void}
 */
function toggleDropdown(elem,dropid) {
	$("#"+dropid).toggleClass('--active');
	let top = $(elem).position().top + $(elem).outerHeight() + 5;
	let {left} = $(elem).position();
	let rect = elem.getBoundingClientRect()
	let sumLeft = +rect.left + +$("#"+dropid).outerWidth();
	if (sumLeft > $(window).outerWidth()) {
		left -=  $("#"+dropid).outerWidth() / 1.75;
	}
	$("#"+dropid).css({'top':top+"px",'left':left+"px"});
	setTimeout(function(){
		document.addEventListener('click', function(e){
			let div = $(elem,"#"+dropid);
			if (!div.is(e.target) && div.has(e.target).length === 0) {
				$("#"+dropid).removeClass('--active');
			}
		}, true)
	},50);
}

/**
 * Toggles the visibility and position of a dropdown element relative to a specified element.
 *
 * @param {HTMLElement} elem - The element that triggers the dropdown toggle.
 * @param {string} dropid - The ID of the dropdown element to toggle.
 * @returns {void}
 */
function initDropDown() {
	document.querySelectorAll('[data-dropdown]').forEach(function(element) {
		if (element.getAttribute('data-dropmenu-init') !== '1') {
			element.setAttribute('data-dropmenu-init', '1');
			const dropid = element.getAttribute('data-dropdown');
			element.addEventListener('click', function() {
				toggleDropdown(element, dropid);
			});
			if (window.getComputedStyle(element).position === 'static') {
				element.style.position = 'relative';
			}
			const top = element.getBoundingClientRect().top + element.offsetHeight + 5;
			let {left} = element.getBoundingClientRect();
			const dropMenu = document.getElementById(dropid);
			const sumLeft = left + dropMenu.offsetWidth + 72;
			left = sumLeft > window.outerWidth ? left - dropMenu.offsetWidth / 1.75 : left;
			dropMenu.style.top = top + 'px';
			dropMenu.style.left = left + 'px';
		}
	});
}

/**
 * Initializes the functionality of a modal element for opening and closing.
 *
 * @returns {void}
 */
function initWOModal() {
    document.querySelectorAll("[data-wo-modal]").forEach(element => {
        element.addEventListener('click', function () {
            let modalid = this.getAttribute("data-wo-modal");
            document.querySelector(`.__wo-modal${modalid}`).classList.add('--active');
        });
    });
    document.querySelectorAll("[data-dismiss]").forEach(element => {
        element.addEventListener('click', function () {
            document.querySelectorAll(".__wo-modal").forEach(modal => {
                modal.classList.remove('--active');
            });
        });
    });
}
function closeWOModal() {
	document.querySelectorAll(".__wo-modal").forEach(element => {
		element.classList.remove('--active');
	});	
}
function openWOModal(modalid) {
	closeWOModal();
	document.querySelector(".__wo-modal" + modalid).classList.add('--active');
}

/**
 * Generates a unique identifier.
 *
 * @returns {string} - The generated unique identifier.
 */
function uniqid() {
  let t = [];
  for (let n = 0; n <= 15; n++) {
    t[n] = n.toString(16);
  }
  let r = "";
  for (let _ = 1; _ <= 36; _++) {
    if (9 === _ || 14 === _ || 19 === _ || 24 === _) {
      r += "-";
    } else if (15 === _) {
      r += 4;
    } else if (20 === _) {
      r += t[4 * Math.random() | 8];
    } else {
      r += t[16 * Math.random() | 0];
    }
  }
  return r;
}

/**
 * Initializes the button color configuration for elements with the 'data-wo-btn-color' attribute.
 * data-wo-btn-color param contain json array with colors of button
 */
function initWOBtnColor() {
    document.querySelectorAll('[data-wo-btn-color]').forEach(element => {
        const config = JSON.parse(element.getAttribute('data-wo-btn-color').replace(/'/g,'"'));
        let id = element.id || `id-${uniqid()}`;
        if (!element.id) {element.id = id}
        
        const styles = woCreateButtonStyles(id, config);
        document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);
        element.removeAttribute('data-wo-btn-color');
    });
}

function woCreateButtonStyles(id, config) {
    return `
        #${id} {
            background-color: ${config.default.bg};
            border-color: ${config.default.border};
            color: ${config.default.text};
        }
        #${id}:hover {
            background-color: ${config.hover.bg};
            border-color: ${config.hover.border};
            color: ${config.hover.text};
        }
        #${id}:active,
		#${id}:focus {
            background-color: ${config.active.bg};
            border-color: ${config.active.border};
            color: ${config.active.text};
        }
    `;
}

function removeAlert(alert) {
	$(alert).parent('.__wo-alert').remove();
}

function initRangeBtn() {
	document.querySelectorAll('[data-range-btn]').forEach(element => {
		element.setAttribute('onclick','toggleRangeBtn(this)');
	});	
}
function toggleRangeBtn(element) {
	if (!element.dataset.active) {
		document.querySelectorAll('[data-range-btn]').forEach(each => {
			each.classList.remove('--active');
			delete each.dataset.active;
		});
		element.dataset.active = true;
		element.classList.add('--active');
	}
	else {
		delete element.dataset.active;
		element.classList.remove('--active');
	}
}

function initRanges() {
	document.querySelectorAll('[data-range]').forEach(range => {
		range.setAttribute('oninput','rangeChange(this)')
		let number = +range.value;
		range.insertAdjacentHTML('afterend','<span>'+number.toLocaleString('ru-RU')+'</span>');
	});
}
function rangeChange(range) {
    let nextSpan = range.nextElementSibling;
    if (nextSpan && nextSpan.tagName === 'SPAN') {
		let number = +range.value;
        nextSpan.textContent = number.toLocaleString('ru-RU');
    }
}

/**
 * Initializes functions based on data-oninit attribute of elements.
 * 
 * This function finds elements with a data-oninit attribute, retrieves the function name specified in the attribute,
 * and executes that function if it exists in the global scope.
 */
function onInit() {
    document.querySelectorAll('[data-oninit]').forEach(element => {
        const functionName = element.getAttribute('data-oninit');
		eval(functionName);
        // if (window[functionName] instanceof Function) {
        //     window[functionName]();
        // }
    });
}


// TEST

function a() {
	
}
async function ajaxLoad(options) {
	const { url, data } = options;
	
	try {
		// Формируем строку запроса с данными
		const queryString = new URLSearchParams(data).toString();

		// Выполняем запрос
		const response = await fetch(`${url}?${queryString}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
	  
		// Проверяем статус ответа
		if (response.ok) {
			// Получаем ответ в виде текста или JSON
			const contentType = response.headers.get('Content-Type');
			if (contentType && contentType.includes('application/json')) {
				return await response.json();
			}
			else {
				return await response.text();
			}
		}
		else {
			throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
		}
	} catch (error) {
		console.error('Ошибка при выполнении запроса:', error);
		throw error;
	}
}