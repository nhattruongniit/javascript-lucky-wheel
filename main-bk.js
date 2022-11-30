(() => {
  const $ = document.querySelector.bind(document);
  const wheel = $('.wheel');
  const btnStart = $('.btn-start');
  const bgBtnStart = $('.bg-button-spin');
  const msg = $('.msg');

  let timer = 7000;
  let isRotating = false;
  let currentRotate = 0;

  const listGift =[
    {
      name: 'Tiles Hop',
      image: './images/products/hop.png',
      percent: 10/100,
      class: 'tiles-hop'
    },
    {
      name: 'Magic Tiles 3',
      image: './images/products/magic3.png',
      percent: 20/100,
      class: 'magic-tiles-3 '
    },
    {
      name: 'Dancing Road',
      image: './images/products/dacing.png',
      percent: 15/100,
      class: 'dancing-road'
    },
    {
      name: 'Color Hop 3D',
      image: './images/products/color3D.png',
      percent: 15/100,
      class: 'color-hop-3d'
    },
    {
      name: 'Dancing Race',
      image: './images/products/dancing_race.png',
      percent: 20/100,
      class: 'dancing-race'
    },
    {
      name: 'Beat Blader 3D',
      image: './images/products/beat.png',
      percent: 10/100,
      class: 'beat-blader-3d'
    },
    {
      name: 'Dancing Sky 3',
      image: './images/products/sky3.png',
      percent: 20/100,
      class: 'dancing-sky3'
    },
    {
      name: 'Beat Tiles',
      image: './images/products/tiles.png',
      percent: 10/100,
      class: 'beat-tiles'
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
      msg.innerHTML = `Congratulations! You won <b>${nameGift}</b>`;
      // console.log(nameGift)
    }, timer)
  }

  const start = () => {
    isRotating = true;
    msg.innerHTML = '';
    bgBtnStart.style.opacity = 0.2;
    const randomNumber = Math.random();
    const gift = getGift(randomNumber);
     
    // console.log('gift: ', gift);
    currentRotate += 360 * 10;

    rotateWheel(currentRotate, gift.index);
    showGift(gift.name)
  }

  btnStart.addEventListener('click', () => {
    !isRotating && start();
  });

  renderItem();
})();