function bgmovewalafoo(id) {
    var divofid = document.querySelector(`.${id}`);
    divofid.classList.add('removebgcolor');
  }
  
  function autobackgroundfoo(id) {
    var divofid = document.querySelector(`.${id}`);
    divofid.classList.remove('removebgcolor');
  }