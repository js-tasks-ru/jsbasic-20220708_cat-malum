function initCarousel() {
	const carouselInner = document.querySelector('.carousel__inner')
  	const carouselSlide = document.querySelector('.carousel__slide')
  	const carouselArrowRight = document.querySelector('.carousel__arrow_right')
  	const carouselArrowLeft = document.querySelector('.carousel__arrow_left')
	let carouselSlideWidth = carouselSlide.offsetWidth
	let slideIndex = 0

	carouselArrowLeft.style.display = 'none'
	 
	carouselArrowRight.addEventListener('click', () => {
		slideIndex += 1
		carouselInner.style.transform = `translateX(-${carouselSlideWidth * slideIndex}px)`
		carouselArrowLeft.style.display = ''


		if (slideIndex === 3) {
			carouselArrowRight.style.display = 'none'
		} else if (slideIndex > 0) {
			carouselArrowLeft.style.display = ''
		}
	})

	carouselArrowLeft.addEventListener('click', () => {
		carouselInner.style.transform = `translateX(${carouselSlideWidth - carouselSlideWidth * slideIndex}px)`
		slideIndex -= 1

		if (slideIndex === 0) {
			carouselArrowLeft.style.display = 'none'
		} else if (slideIndex < 3) {
			carouselArrowRight.style.display = ''
		}
	})
}
