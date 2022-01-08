/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */
{
	// From https://davidwalsh.name/javascript-debounce-function.
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	// Window size.
	let win = {width: window.innerWidth, height: window.innerHeight};
	let rawin = (window.innerWidth > 640)? 0.3: 1;
	
	
	// some animation settings.
	const settings = {
		image: {duration: 900, delay: 0, easing: [0.8,0,0.2,1]},
		more: {duration: 1900, delay: 0, easing: [0.8,0,0.2,1]},
		facts: {duration: 300, delay: 0, easing: [0.8,0,0.2,1]},
		title: {duration: 600, delay: 800, easing: [0.8,0,0.2,1]},
		titlee: {duration: 600, delay: 800, easing: [0.8,0,0.2,1]},
		description: {duration: 900, delay: 400, easing: 'easeOutExpo'},
		pagination: {duration: 300, delay: 400, easing: 'easeInOutQuad'},

		menuCtrl: {duration: 300, easing: [0.2,1,0.3,1]},
		menuItems: {duration: 300, easing: [0.2,1,0.3,1]},
		factsCtrl: {duration: 300, easing: 'linear'},
		gallery: {duration: 800, easing: [0.2,1,0.3,1]},
		navigationCtrls: {duration: 800, easing: [0.8,0,0.2,1]},
		previewCloseCtrl: {duration: 300, easing: 'easeOutExpo'},
		factsItems: {duration: 800, easing: [0.8,0,0.2,1]},
		expander: {duration: 800, easing: [0.8,0,0.2,1]},
	
	};
	
	class Entry {
        constructor(el) {
            this.DOM = {el: el};
            this.init();
        }
        init() {
			// DOM elements:
			// title
			this.DOM.title = this.DOM.el.querySelector('#anim-4 .ferra > .section__title');
			this.DOM.titlee = this.DOM.el.querySelector('#anim-5 .ferra  > .section__title');
			charming(this.DOM.title);
			this.DOM.titleLetters = this.DOM.title.querySelectorAll('span');
			charming(this.DOM.titlee);
			
			this.DOM.titleeLetters = this.DOM.titlee.querySelectorAll('span');
			// slogan
			this.DOM.description = this.DOM.el.querySelector('#anim-6 .ferra  > .section__description');
			// images
			this.DOM.imagemin = this.DOM.el.querySelector('#anim-7 .ferra  >  .section__description');
		//	this.DOM.image = this.DOM.el.querySelector('#anim-8 .ferra  > .section__img');
			this.DOM.images = this.DOM.el.querySelector('#anim-8 .ferra  >  .section__description');
			// triangles
			this.DOM.more = this.DOM.el.querySelector('#anim-2 .ferra');
			this.DOM.moree = this.DOM.el.querySelector('#anim-3 .ferra');
			// fons
			this.DOM.leftfon = this.DOM.el.querySelector('#anim-0 .ferra');
			this.DOM.rightfon = this.DOM.el.querySelector('#anim-1  .ferra  >  .section__description');
			this.DOM.studio = this.DOM.el.querySelector('#anim-10  .ferra  >  .section__description');
			// expander
			this.DOM.expander = this.DOM.el.querySelector('#anim-9  .section__expander');
			this.DOM.factsis = this.DOM.el.querySelector('#anim-9 .facts__toggles');
			// facts
			this.DOM.facts = {
				wrapper: this.DOM.el.querySelector('#anim-9 .section__facts'),
				items: Array.from(this.DOM.el.querySelectorAll('#anim-9 .section__facts > .section__facts-item'))
			};
		}
		show(direction) {
			this.isHidden = false;
			return this.toggle(direction);
		}
		hide(direction) {
			this.isHidden = true;
			return this.toggle(direction);
		}
		toggle(direction) {
			this.direction = direction; 
			return Promise.all([this.toggleTitle(!this.isHidden),
								this.toggleTitlee(!this.isHidden),
								this.toggleDescription(!this.isHidden),
						//   	this.toggleImage(!this.isHidden),
						        this.toggleStudio(!this.isHidden),
								this.toggleImages(!this.isHidden),
								this.toggleImagemin(!this.isHidden),
								this.toggleMore(!this.isHidden),
								this.toggleMoree(!this.isHidden),
								this.toggleLeftfon(!this.isHidden),
								this.toggleRightfon(!this.isHidden),
								this.toggleExpan(!this.isHidden),
								this.toggleFacts(!this.isHidden)]);
		}
		toggleTitle() {
			anime.remove(this.DOM.titleLetters);
			return anime({
				targets: this.DOM.titleLetters,
				duration: settings.title.duration,
				delay: (target, index) => index * 60 + settings.title.delay,
				easing: settings.title.easing,
			translateY: this.isHidden ? ['0%',this.direction === 'next' ? '100%' : '-100%'] : [this.direction === 'next' ? '-100%' : '100%','0%'],
				opacity: {
					value: this.isHidden ? 0 : 1,
					duration: 900,
					delay: (target, index) => this.isHidden ? settings.title.duration + settings.title.delay : settings.title.delay
				}
			}).finished;
		}
		toggleTitlee() {
			anime.remove(this.DOM.titleeLetters);
			return anime({
				targets: this.DOM.titleeLetters,
				duration: settings.titlee.duration,
				delay: (target, index) => index * 60 + settings.titlee.delay,
				easing: settings.titlee.easing,
			translateY: this.isHidden ? ['0%',this.direction === 'next' ? '100%' : '-100%'] : [this.direction === 'next' ? '-100%' : '100%','0%'],
				opacity: {
					value: this.isHidden ? 0 : 1,
					duration: 900,
					delay: (target, index) => this.isHidden ? settings.titlee.duration + settings.titlee.delay : settings.titlee.delay
				}
			}).finished;
		}
		
		toggleDescription() {
			anime.remove(this.DOM.description);
			return anime({
				targets: this.DOM.description,
				duration: settings.description.duration,
				delay: !this.isHidden ? settings.description.duration * 0.5 + settings.description.delay : settings.description.delay,
				easing: settings.description.easing,
				translateY: this.isHidden ? [0, this.direction === 'next' ? '10%' : '-10%'] : [this.direction === 'next' ? '-10%' : '10%', 0],
				opacity: this.isHidden ? 0 : 1
			}).finished;
		}
		toggleStudio() {
			anime.remove(this.DOM.studio);
			return anime({
				targets: this.DOM.studio,
				duration: settings.description.duration,
				delay: !this.isHidden ? settings.description.duration * 0.5 + settings.description.delay : settings.description.delay,
				easing: settings.description.easing,
				translateY: this.isHidden ? [0, this.direction === 'next' ? '120%' : '-120%'] : [this.direction === 'next' ? '-120%' : '120%', 0],
				opacity: this.isHidden ? 0 : 1
			}).finished;
		}
/*	toggleImage() {
			

			anime.remove(this.DOM.image);
			return anime({
				targets: this.DOM.image,
				duration: settings.image.duration,
				delay: settings.image.delay,
				easing: settings.image.easing,
				
				scale: !this.isHidden ? [0,1] : [1,0],
				opacity: {
					value: this.isHidden ? 0 : 1,
					duration: 1,
					delay: this.isHidden ? settings.image.duration + settings.image.delay : settings.image.delay
				}
			}).finished;
		}
*/
		toggleImages() {
			

			anime.remove(this.DOM.images);
			return anime({
				targets: this.DOM.images,
				duration: settings.image.duration,
				delay: settings.image.delay,
				easing: settings.image.easing,
				
				scale: !this.isHidden ? [0,1] : [1,0],
				opacity: {
					value: this.isHidden ? 0 : 1,
					duration: 1,
					delay: this.isHidden ? settings.image.duration + settings.image.delay : settings.image.delay
				}
			}).finished;
		}
		toggleImagemin() {
			

			anime.remove(this.DOM.imagemin);
			return anime({
				targets: this.DOM.imagemin,
				duration: settings.image.duration,
				delay: settings.image.delay,
				easing: settings.image.easing,
				
				scale: !this.isHidden ? [0,1] : [1,0],
				opacity: {
					value: this.isHidden ? 0 : 1,
					duration: 1,
					delay: this.isHidden ? settings.image.duration + settings.image.delay : settings.image.delay
				}
			}).finished;
		}
		toggleMore() {
			anime.remove(this.DOM.more);
			return anime({
				targets: [this.DOM.more, this.DOM.more.children],
				duration: settings.more.duration,
				delay: settings.more.delay,
				easing: settings.more.easing,
				translateY: this.isHidden ? ['0%',this.direction === 'next' ? '100%' : '-100%'] : [this.direction === 'next' ? '-100%' : '100%','0%'],
				opacity: {
					value: this.isHidden ? 0 : 1,
					duration: (target, index) => index ? settings.more.duration/3 : 1,
					delay: (target, index) => index ? 
												this.isHidden ? 100 : settings.more.duration * 0.5 + settings.more.delay :
												this.isHidden ? settings.more.duration + settings.more.delay : settings.more.delay
				}
			}).finished;
		}
		toggleMoree() {
			anime.remove(this.DOM.moree);
			return anime({
				targets: this.DOM.moree,
				duration: settings.more.duration,
				delay: settings.more.delay,
				easing: settings.more.easing,
				translateY: this.isHidden ? ['0%',this.direction === 'next' ? '100%' : '-100%'] : [this.direction === 'next' ? '-100%' : '100%','0%'],
				opacity: {
					value: this.isHidden ? 0 : 1,
					duration: (target, index) => index ? settings.more.duration/3 : 1,
					delay: (target, index) => index ? 
												this.isHidden ? 100 : settings.more.duration * 0.5 + settings.more.delay :
												this.isHidden ? settings.more.duration + settings.more.delay : settings.more.delay
				}
			}).finished;
		}
		toggleExpan() {
			anime.remove(this.DOM.factsis);
			return anime({
				targets: [this.DOM.factsis],
				duration: settings.more.duration,
				delay: settings.more.delay,
				easing: settings.more.easing,
				translateY: this.isHidden ? ['0%',this.direction === 'next' ? '100%' : '-100%'] : [this.direction === 'next' ? '-100%' : '100%','0%'],
				opacity: {
					value: this.isHidden ? 0 : 1,
					duration: (target, index) => index ? settings.more.duration/3 : 1,
					delay: (target, index) => index ? 
												this.isHidden ? 100 : settings.more.duration * 0.5 + settings.more.delay :
												this.isHidden ? settings.more.duration + settings.more.delay : settings.more.delay
				}
			}).finished;
		}
		toggleLeftfon() {
			anime.remove(this.DOM.leftfon);
			return anime({
				targets: this.DOM.leftfon,
				duration: settings.more.duration,
				delay: settings.more.delay,
				easing: settings.more.easing,
			
				opacity: !this.isHidden ? [0,1] : [1,0]
					
			}).finished;
		}
		toggleRightfon() {
			anime.remove(this.DOM.rightfon);
			return anime({
				targets: this.DOM.rightfon,
				duration: settings.more.duration,
				delay: settings.image.delay,
				easing: settings.more.easing,
			//	strokeDashoffset: [anime.setDashoffset, 0]
			scale: !this.isHidden ? [0,1] : [1,0],
				opacity: {
					value: this.isHidden ? 0 : 1,
					duration: 1,
					delay: this.isHidden ? settings.image.duration + settings.image.delay : settings.image.delay}
			}).finished;
		}
		
		toggleFacts() {
			anime.remove(this.DOM.facts.items);
			return anime({
				targets: this.DOM.facts.items.slice(0, 2),
				duration: settings.facts.duration,
				delay: (target, index) => {
					return !this.isHidden ? index * 40 + settings.facts.duration * 0.5 + settings.facts.delay : index * 40 + settings.facts.delay;
				},
				easing: settings.facts.easing,
				translateY: this.isHidden ? [this.DOM.facts.ty, this.direction === 'next' ? this.DOM.facts.ty-20 : this.DOM.facts.ty+20] : [this.direction === 'next' ? this.DOM.facts.ty+20 : this.DOM.facts.ty-20, this.DOM.facts.ty],
				opacity: this.isHidden ? 0 : 1
			}).finished;
		}
    };

    class Slideshow {
        constructor(el) {
            this.DOM = {};
            this.DOM.el = el;
            this.init();
        }
        init() {
			// DOM elements.
		
			this.DOM.factsContainer = this.DOM.el.querySelector('.facts');
			this.DOM.factsCtrls = {
				toggle: this.DOM.factsContainer.querySelector('.facts__toggle'),
				more: this.DOM.factsContainer.querySelector('.facts__toggle > .facts__toggle-inner--more'),
				less: this.DOM.factsContainer.querySelector('.facts__toggle > .facts__toggle-inner--less'),
			};
			this.DOM.previewCloseCtrl = this.DOM.factsContainer.querySelector('.button-contentclose');
			this.DOM.pagination = this.DOM.el.querySelector('.sections__index .sections__index-inner');
			this.DOM.navigation = this.DOM.el.querySelector('.sections__nav');
			this.DOM.navigation.prevCtrl = this.DOM.navigation.querySelector('button.sections__nav-item--prev');
			this.DOM.navigation.nextCtrl = this.DOM.navigation.querySelector('button.sections__nav-item--next');
			this.DOM.entries = Array.from(this.DOM.el.querySelectorAll('.section'), entry => new Entry(entry));
			this.entriesTotal = this.DOM.entries.length;
			this.currentPos = 0;

			this.layout();
			// Init/Bind events.
			this.initEvents();
		}
		layout() {
			this.currentEntry = this.DOM.entries[this.currentPos];
			const factEl = this.currentEntry.DOM.facts.items[0];
			const factHeight = factEl.getBoundingClientRect().height + parseFloat(window.getComputedStyle(factEl).marginBottom);
			const paddingFactsStyle = window.getComputedStyle(this.currentEntry.DOM.facts.wrapper);
			const paddingFacts = parseFloat(paddingFactsStyle.paddingTop) + parseFloat(paddingFactsStyle.paddingBottom);
			
			this.factsTranslation = win.height - -1 * factHeight - paddingFacts;
			for ( let i = 0; i <= this.entriesTotal - 1; ++i ) {
				const entry = this.DOM.entries[i];
				entry.DOM.expander.style.transform = `scale3d(0.3,1,1) translate3d(0px,${this.factsTranslation}px,0px)`;
				for ( let j = 0, len = entry.DOM.facts.items.length; j <= len - 1; ++j ) {
					entry.DOM.facts.ty = this.factsTranslation;
					const item = entry.DOM.facts.items[j];
					item.style.transform = `translate3d(0px,${this.factsTranslation}px,0px)`;
					if ( j > 1 ) {
						item.style.opacity = 0;
					}
					else if ( i === this.currentPos ){
						item.style.opacity = 1;
					}
				}
			}
		}
		initEvents() {
			// Navigation
			this.onPrevClick = () => this.navigate('prev');
			this.onNextClick = () => this.navigate('next');
			this.DOM.navigation.prevCtrl.addEventListener('click', this.onPrevClick);
			this.DOM.navigation.nextCtrl.addEventListener('click', this.onNextClick);
			var that = this;
			this.indicator = new WheelIndicator({
			  elem: document.querySelector('body'),
			  callback: function(e){
			    if(e.direction == "up" ) that.onPrevClick();
			    if(e.direction == "down" ) that.onNextClick();
			  }
			});
			
			// Main menu
		//	this.DOM.menu.menuCtrls.toggle.addEventListener('click', () => this.toggleMenu());
			
			// Facts Container
			this.DOM.factsCtrls.toggle.addEventListener('click', () => this.toggleFactsContainer());
			
			// Facts (clickable facts)
			for ( let i = 0; i <= this.entriesTotal - 1; ++i ) {
				const entry = this.DOM.entries[i];
				entry.DOM.facts.items
					 .filter(fact => fact.classList.contains('section__facts-item--clickable'))
					 .forEach(clickableFact => clickableFact.addEventListener('click', () => this.preview(clickableFact.dataset.gallery)));
			}
			
			// Close preview
			this.DOM.previewCloseCtrl.addEventListener('click', () => this.closePreview());
			
			// Window resize
			this.onResize = () => {
				win = {width: window.innerWidth, height: window.innerHeight};
				this.layout();
				if ( this.isFactsOpen ) {
					// Toggle the factsCtrls state
					this.DOM.factsCtrls.more.style.opacity = 1;
					this.DOM.factsCtrls.less.style.opacity = 0;
					this.isFactsOpen = !this.isFactsOpen;
					this.toggleNavigationCtrls({opacity: 1, duration: 1});
					this.isFactsAnimating = false;
				}
				if ( this.gallery ) {
					this.DOM.previewCloseCtrl.style.opacity = 0;
					this.toggleGallery(this.gallery, {duration: 1,opacity: 0}).then(() => this.gallery = null);
				}
				this.DOM.el.classList.remove('sections--factsopen');
			};
			window.addEventListener('resize', debounce(() => this.onResize(), 20));
		}
		navigate(direction) {
			if ( this.isEntriesAnimating || this.isFactsAnimating ) return;
			this.isEntriesAnimating = true;
			// Store direction
			this.direction = direction;
			// Update currentPos
			const newPos = this.currentPos = this.direction === 'next' ? 
				this.currentPos < this.entriesTotal - 1 ? this.currentPos + 1 : 0 : 
				this.currentPos = this.currentPos > 0 ? this.currentPos - 1 : this.entriesTotal - 1;

			const newEntry = this.DOM.entries[newPos];

			this.update(newEntry);
		}
		update(newEntry) {
			const updateFn = () => {
				// hide the current entry and show the next/previous one.
				// when both updatePageNumber, hide and show are finished:
				Promise.all([this.currentEntry.hide(this.direction), newEntry.show(this.direction), this.updatePageNumber()]).then(() => {
					this.isEntriesAnimating = false;
					this.currentEntry.DOM.el.classList.remove('section--current');
					newEntry.DOM.el.classList.add('section--current');
					this.currentEntry = newEntry;
				});
			};

			if ( this.isFactsOpen ) {
				this.toggleFactsContainer().then(updateFn);
			}
			else {
				updateFn();
			}
		}
		updatePageNumber() {
			anime.remove(this.DOM.pagination);
			let halfway = false;
			return anime({
				targets: this.DOM.pagination,
				duration: settings.pagination.duration,
				easing: 'easeInOutQuad',
				translateY: [
					{value: this.direction === 'next' ? '100%' : '-100%', delay: settings.pagination.delay},
					{value: [this.direction === 'next' ? '-100%' : '100%','0%'], delay: settings.pagination.duration}
				],
				opacity: [
					{value: 0, delay: settings.pagination.delay},
					{value: [0,1], delay: settings.pagination.duration}
				],
				update: (anime) => {
					if ( anime.progress >= 50 && !halfway ) {
						halfway = true;
						this.DOM.pagination.innerHTML = `0${this.currentPos + 1}`;
					}
				}
			}).finished;
		}
	
		toggleFactsContainer() {
			if ( this.isFactsAnimating ) {
				return;
			};
			this.isFactsAnimating = true;
			return Promise.all([this.toggleFactsCtrl(), this.animateExpander(), this.animateFactsItems()]).then(() => {
				this.isFactsOpen = !this.isFactsOpen;
				this.isFactsAnimating = false;
			});
		}
		preview(gallery) {
			if ( this.isFactsAnimating || !gallery ) return;
			this.isFactsAnimating = true;

			this.gallery = gallery;
			this.DOM.el.classList.add('sections--factsopen');
			this.indicator.turnOff();
			Promise.all([
				this.toggleNavigationCtrls({
					opacity: 0
				}),
				this.toggleFactsCtrl({
					delay: 0,
					opacity: 0
				}),
				this.animateExpander({
					translateY: 0,
					scaleX: 1.00
				}),
				this.animateFactsItems({
					translateY: 0,
					opacity: 0,
					delay: 0
				}),
				this.togglePreviewCloseCtrl({
					opacity: 1,
					delay: 800
				}),
				this.toggleGallery(gallery, {
					opacity: 1,
					scale: (target, index) => index ? [0.7,1] : [1,1], // just the images..
					//translateX:(target, index) => index ? [10%,-10%] : [-10%,10%],
					delay: (target, index) => index ? index * 300 + 700 : 700 // just the images..
				})
			]).then(() => this.isFactsAnimating = false);
		}
		closePreview() {
			if ( this.isFactsAnimating ) return;
			this.isFactsAnimating = true;
             this.indicator.turnOn();
			Promise.all([
				this.toggleNavigationCtrls({
					opacity: 1
				}),
				this.toggleFactsCtrl({
					delay: 600,
					opacity: (target, index) => index,
				}),
				this.animateExpander({
					translateY: 0,
					scaleX: rawin
				}),
				this.animateFactsItems({
					translateY: 0,
					opacity: 1,
					delay: 200
				}),
				this.togglePreviewCloseCtrl({
					opacity: 0
				}),
				this.toggleGallery(this.gallery, {
					opacity: 0
				})
			]).then(() => {
				this.isFactsAnimating = false;
				this.gallery = null;
				this.DOM.el.classList.remove('sections--factsopen');
			});
		}
		animateExpander(animeconfig) {
			return this.animate(Object.assign({
				targets: this.currentEntry.DOM.expander,
				duration: settings.expander.duration,
				easing: settings.expander.easing,
				delay: !this.isFactsOpen ? 0 : 300,
				translateY: !this.isFactsOpen ? [this.factsTranslation, 0] : this.factsTranslation,
				scaleX: [rawin,rawin]
			}, animeconfig));
		}
		animateFactsItems(animeconfig) {
			return this.animate(Object.assign({
				targets: this.currentEntry.DOM.facts.items,
				duration: settings.factsItems.duration,
				easing: settings.factsItems.easing,
				delay: (target, index, total) => !this.isFactsOpen ? (index+1) * 30 + 150 : (total-index-1) * 30,
				translateY: !this.isFactsOpen ? [this.factsTranslation,0] : this.factsTranslation,
				opacity: (target, index) => !this.isFactsOpen ? 1 : index > 1 ? 0 : 1
			}, animeconfig));
		}
		toggleFactsCtrl(animeconfig) {
			return this.animate(Object.assign({
				targets: [this.DOM.factsCtrls.more, this.DOM.factsCtrls.less],
				duration: settings.factsCtrl.duration,
				easing: settings.factsCtrl.easing,
				opacity: (target, index) => index ? !this.isFactsOpen ? 1 : 0 : !this.isFactsOpen ? 0 : 1
			}, animeconfig));
		}
		togglePreviewCloseCtrl(animeconfig) {
			return this.animate(Object.assign({
				targets: this.DOM.previewCloseCtrl,
				duration: settings.previewCloseCtrl.duration,
				easing: settings.previewCloseCtrl.easing
			}, animeconfig));
		}
		toggleNavigationCtrls(animeconfig) {
			return this.animate(Object.assign({
				targets: [this.DOM.navigation.prevCtrl, this.DOM.navigation.nextCtrl],
				duration: settings.navigationCtrls.duration,
				easing: settings.navigationCtrls.easing
			}, animeconfig));
		}
		toggleGallery(gallery, animeconfig) {
			return this.animate(Object.assign({
				targets: this.DOM.el.querySelectorAll(`#${gallery} > .section__gallery-item`),
				duration: settings.gallery.duration,
				easing: settings.gallery.easing
			}, animeconfig));
		}
		animate(opts) {
			anime.remove(opts.targets);
			return anime(opts).finished;
		}
	};

	// Preload all the images in the page..
	
		
		// Init
		new Slideshow(document.querySelector('.sections'));
	
};