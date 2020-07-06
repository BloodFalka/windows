const images = () => {
    const imgPopup = document.createElement('div'),
          workSection = document.querySelector('.works'),
          bigImage = document.createElement('img');

    imgPopup.classList.add('popup', 'faded-fast');
    imgPopup.setAttribute('data-modal-images', '');
    workSection.appendChild(imgPopup);

    imgPopup.style.display = 'none';
    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';

    bigImage.style.maxWidth = '85vw';
    imgPopup.appendChild(bigImage);

    workSection.addEventListener('click', (e) => {
        e.preventDefault();

        let target = e.target;

        if (target && target.classList.contains('preview')){
            imgPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden'
            document.querySelector('body').style.marginRight = `${scroll}px`;

            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path);
        };

        if(target && target.matches('div.popup')){
            imgPopup.style.display = 'none';
            document.body.style.overflow = '';
            document.querySelector('body').style.marginRight = `0px`;
        };
    });
};

export default images;