(() => {
  const $ = document.querySelector.bind(document);
  const wheel = $('.wheel');
  const btnStart = $('.btn-start');
  const bgBtnStart = $('.bg-button-spin');
  const msg = $('.msg');
  const btnPlay = $('.btn-play');
  const imgReward = $('.img-reward');
  const audioArrow = $('.audioArrow');
  const msgContent = $('.msg_content');

  let timer = 7000;
  let isRotating = false;
  let currentRotate = 0;

  const listGift =[
    {
      name: 'T-Shirt',
      image: './images/reward/shirt.png',
      nameImage: 'shirt',
      percent: 49/100,
      class: 'tiles-hop'
    },
    {
      name: 'Sock',
      image: './images/reward/socks.png',
      nameImage: 'socks',
      percent: 24/100,
      class: 'magic-tiles-3 '
    },
    {
      name: 'Cap',
      image: './images/reward/cap.png',
      nameImage: 'cap',
      percent: 15/100,
      class: 'dancing-road'
    },
    {
      name: 'Backpack',
      image: './images/reward/backpack.png',
      nameImage: 'backpack',
      percent: 12/100,
      class: 'color-hop-3d'
    },
  ];

  const size = listGift.length;
  const rotate = 360 / size; // số góc 1 phần tử trong lucky wheel
  const skewY = 90 - rotate; // độ nghiêng của 1 phần tử trong lucky wheel

  const renderItem = () => {
    listGift.map((item, index) => {
      const itemEl = document.createElement('li');
      itemEl.style.transform = `rotate(${rotate * index}deg) skewY(-${skewY}deg)`;
      itemEl.innerHTML = `
        <p 
          class="text-item ${item.class}" 
          style="
            transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);
          "
        >
          <img src="${item.image}" alt="" class="image-product">
          <b>${item.name}</b>
        </p>
      `;
      wheel.appendChild(itemEl);
    })
  };
  const rotateWheel = (currentRotate, index) => {
    wheel.style.transform = `rotate(${currentRotate - index * rotate - rotate / 2}deg)`;
  }

  const getGift = (randomNumber) => {
    let currentPerecent = 0;
    let list = [];

    listGift.forEach((item, index) => {
      currentPerecent += item.percent;
      randomNumber <= currentPerecent && list.push({...item, index});
    })
    return list[0];
  }

  const showGift = (nameGift) => {
    setTimeout(() => {
      isRotating = false;
      bgBtnStart.style.opacity = 0.8;
      msg.style.opacity = 1;
      msg.style.zIndex = 999;
      // pause audio
      audioArrow.pause();

      btnStart.removeEventListener('click', init);
      msgContent.style.display = 'block';
      imgReward.src = './images/reward/' + nameGift + '.png';
    }, timer)
  }

  const start = () => {
    // play audio
    audioArrow.play();

    isRotating = true;
    bgBtnStart.style.opacity = 0.2;
    const randomNumber = Math.random();

    const gift = getGift(randomNumber);
    currentRotate += 360 * 10;

    rotateWheel(currentRotate, gift.index);
    showGift(gift.nameImage)
  }

  function init() {
    !isRotating && start();
  }

  btnStart.addEventListener('click', init);

  btnPlay.addEventListener('click', () => {
    msg.style.opacity = 0;
    msg.style.zIndex = -1;
    imgReward.src = '';
    msgContent.style.display = 'none';
    btnStart.addEventListener('click', init);
  })

  renderItem();
})();