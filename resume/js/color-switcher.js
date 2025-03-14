
$(document).ready(function(){
  $('#colorSwitcher').click(function(){
    // Index Page
    $('body').toggleClass('dark-bg');
    $('section.gray-bg').toggleClass('dark-gray-bg');
    $('.title-area h1').toggleClass('white-text-color');
    $('.title-area h2').toggleClass('white-text-color');
    $('p').toggleClass('white-text-color');
    $('.single-service-box .front-side').toggleClass('dark-side');
    $('.service-line-black').toggleClass('white-text-color');
    $('.service-line-black').toggleClass('white-line');
    $('.title-border').toggleClass('white-line');
    $('.scroll-down span').toggleClass('white-text-color');
    $('.hero-name').toggleClass('white-text-color');
    $('.hero-name').toggleClass('dark-mode');
    $('.hero-gretting').toggleClass('white-text-color');
    $('.hero-title').toggleClass('white-text-color');
    $('.contact-me').toggleClass('white-text-color');
    $('.contact-me span').toggleClass('white-text-color');
    $('.skill-div h5').toggleClass('white-text-color');
    $('.skill-div h5').toggleClass('white-sm-box');
    $('.skill-progressbar h5,.line-progressbar').toggleClass('white-text-color');
    $('.year-duration').toggleClass('white-text-color');
    $('.price-details').toggleClass('white-text-color');
    $('.contact-form-box').toggleClass('dark-gray-bg');
    $('.contact-form-box input,.contact-form-box textarea').toggleClass('dark-bg');
    $('.contact-form-box input.dark-bg,.contact-form-box textarea.dark-bg').toggleClass('dark-placeholder');
    $('.footer-header h4').toggleClass('white-text-color');
    $('.footer-nav ul li a').toggleClass('white-text-color');
    $('.footer-contact li').toggleClass('white-text-color');

    // Portfolio Page
    $('.portfolio-info-box').toggleClass('dark-gray-bg');
    $('.portfolio-section-text h3').toggleClass('white-text-color');
    $('.portfolio-title').toggleClass('white-line');
    $('.feature-text h5').toggleClass('white-color-text');
    $('.single-portfolio-service-box').toggleClass('dark-gray-bg');
    $('.single-portfolio-service-box h4').toggleClass('white-line');
    $('.single-portfolio-service-box h4').toggleClass('white-color-text');

    // Blog Page
    $('.blog-author-post-info span').toggleClass('white-color-text');
    $('.blog-author-post-info hr').toggleClass('white-line');
    $('.blog-details-title').toggleClass('white-color-text');
    $('.quote-reviewer h3').toggleClass('white-color-text');
    $('.reviewer-name-id').toggleClass('white-color-text');
    $('.mini-blog-title h4').toggleClass('white-color-text');
    $('.blog-tag-catagory-and-share-link span').toggleClass('white-color-text');
    $('.post-like-title h2').toggleClass('white-color-text');
    $('.post-date span').toggleClass('white-color-text');
    $('.post-like-title h4 a').toggleClass('white-color-text');
    $('.comment-author h5').toggleClass('white-text-color');
    $('.comment-author span').toggleClass('white-text-color');
  })
})