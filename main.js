(() => {
  const $ = document.querySelector.bind(document);
  const wheel = $('.wheel');
  const btnStart = $('.btn-start');
  const msg = $('.msg');

  let timer = 7000;
  let isRotating = false;
  let currentRotate = 0;

  const listGift =[
    {
      name: 'IPHONE 1',
      percent: 10/100
    },
    {
      name: 'IPHONE 2',
      percent: 20/100
    },
    {
      name: 'IPHONE 3',
      percent: 15/100
    },
    {
      name: 'IPHONE 4',
      percent: 15/100
    },
    {
      name: 'IPHONE 5',
      percent: 20/100
    },
    {
      name: 'IPHONE 6',
      percent: 10/100
    },
    {
      name: 'IPHONE 7',
      percent: 20/100
    },
    {
      name: 'IPHONE 8',
      percent: 10/100
    },
    {
      name: 'IPHONE 9',
      percent: 20/100
    },
    {
      name: 'IPHONE 10',
      percent: 5/100
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
          class="text-item ${index % 2 === 0 && 'even' }" 
          style="
            transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);
          "
        >
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
      btnStart.innerHTML = "Spin now";
      btnStart.style.opacity = 0.8;
      msg.innerHTML = `Congratulations! You won <b>${nameGift}</b>`;
      // console.log(nameGift)
    }, timer)
  }

  const start = () => {
    isRotating = true;
    msg.innerHTML = '';
    btnStart.innerHTML = "Spinning...";
    btnStart.style.opacity = 0.2;

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