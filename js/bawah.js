//角度スライダー
const angleSlider = () => {
  //要素チェック
  const angleSliders = document.querySelectorAll('.js-angle-slider');
  if(angleSliders.length === 0) {
    return;
  }

  angleSliders.forEach((angleSlider,sliderIndex) => {
    //スライダー本体チェック
    const slider = angleSlider.querySelector('.js-angle-slider__list');
    const sliderBody = angleSlider.querySelector('.js-angle-slider__body');
    if(!slider || !slider) {
      return;
    }

    //スライダー初期設定
    let sliderId = slider.getAttribute('id');
    if(!sliderId) {
      slider.setAttribute('id','circle-slider-' + ( sliderIndex + 1));
      sliderId = slider.getAttribute('id');
    }
    slider.setAttribute('role', 'tabpanel');
    slider.setAttribute('aria-label', 'Carousel preview');

    /*
      スライド要素の複製
    */
    //表示スライド数
    let showLen = slider.dataset.show ? Number(slider.dataset.show) : 7;
    showLen *= 2;

    //スライド要素を取得
    const children = slider.children;

    //スライド要素の初期設定と一式取得
    let cloneListBefore = [];
    let cloneListAfter = [];
    let baseChildren = '';

    for (let i = 0; i < children.length; i++) {
      children[i].setAttribute('role', 'tabpanel');
      children[i].setAttribute('aria-roledescription', 'slide');
      children[i].ariaHidden = true;
      children[i].dataset.index = i;
    }

    for (let i = 0; i < children.length; i++) {
      //複製要素（前）
      const cloneBefore = children[i].cloneNode(true);
      cloneBefore.classList.add('is-clone','is-before');
      cloneListBefore.push(cloneBefore.outerHTML);

      //複製要素（後ろ）
      const cloneAfter = children[i].cloneNode(true);
      cloneAfter.classList.add('is-clone','is-after');
      cloneListAfter.push(cloneAfter.outerHTML);

      //ベース要素
      children[i].classList.add('is-base');
      if(i === 0) {
        children[i].classList.add('is-active');
      }
      children[i].ariaHidden = false;

      baseChildren += children[i].outerHTML;
    }

    //先頭の要素が中央に来るよう配置
    let slideList = [...cloneListBefore, baseChildren, ...cloneListAfter];
    //数が足りない場合は複製を繰り返す
    while (slideList.length < showLen) {
      slideList = [...cloneListBefore, ...slideList, ...cloneListAfter];
    }

    //中身をリセットしてスライダー要素を反映
    slider.innerHTML = '';
    for (let i = 0; i < slideList.length; i++) {
      slider.insertAdjacentHTML('beforeend',slideList[i]);
    }


    /*
      スライド要素を配置
    */
    //分割角度取得
    const baseAngle = slider.dataset.slideAngle ? Number(slider.dataset.slideAngle) : 12;

    //スライダー要素を用途ごとに分割して取得
    const items = slider.children;
    const beforeItems = [];
    const baseItems = [];
    const baseAfterItems = [];
    const afterItems = [];
    for( let i = 0 ; i < items.length ; i ++ ) {
      const item = items[i];
      if(item.classList.contains('is-before')) {
        beforeItems.push(item);
        continue;
      }
      if(item.classList.contains('is-base')) {
        baseItems.push(item);
        baseAfterItems.push(item);
        continue;
      }
      if(item.classList.contains('is-after')) {
        baseAfterItems.push(item);
        afterItems.push(item);
        continue;
      }
    }
    //要素の総数を取得
    const baseLen = baseItems.length;
    const beforeLen = beforeItems.length;
    const itemsLen = items.length;


    //ドットナビゲーション生成チェック
    let isDots = slider.dataset.dots;
    if(isDots !== 'true') {
      isDots = false;
    }
    //ドットナビゲーション格納用配列
    const dotsList = [];


    //配置などの基準となる各ベース値を取得
    let winWidth,winWidthHalf,itemWidth,itemWidthHalf,itemHeight;
    const getBaseVal = () => {
      const baseItem = angleSlider.querySelector('.js-angle-slider__item.is-active');
      itemHeight = baseItem.getBoundingClientRect().height;
      itemWidth = baseItem.getBoundingClientRect().width;
      itemWidthHalf = itemWidth / 2;
      winWidth = window.innerWidth;
      winWidthHalf = winWidth / 2;
    }
    getBaseVal();


    //位置を取得
    const getPosition = (angle) => {
      //自身から0度までにどれだけアングルが存在するか
      const angleLength = Math.abs(angle) / baseAngle + 1;
      //xの基準位置：画面の中央
      let x = winWidthHalf - itemWidthHalf;
      let y = 0;

      //角度が正の値かどうかチェック
      const isPositive = angle >= 0;

      /*
        ・0度以外の配置を取得する
          【】コメントは以下参考サイトのコメント内容に対応する
            参考：JavaScript, 三角関数のおさらい
            https://nanoris.livedoor.blog/archives/51708153.html
      */
      for (let i = 1; i < angleLength; i++) {
        const thisAngle = baseAngle * i;
        //直前の角度（自身より上に存在する要素の角度）
        const beforeAngle = thisAngle - baseAngle;

        //【角度をラジアンに変換する。】
        const radian = thisAngle * Math.PI / 180;
        const BeforeRadian = beforeAngle * Math.PI / 180;

        //傾斜の高さ分下にずらず（前後（高い方）の下端に合わせる）【辺c と角度θ から辺b の長さを求める】
        const tiltHeight = itemWidthHalf * Math.sin(radian);
        const BeforeTiltHeight = itemWidthHalf * Math.sin(BeforeRadian);
        y += tiltHeight + BeforeTiltHeight;

        //傾いた分 離れた横方向の距離を求める【辺c と角度θ から辺a の長さを求める】
        const distance = itemWidthHalf - (itemWidthHalf * Math.cos(radian));
        const BeforeDistance = itemWidthHalf - (itemWidthHalf * Math.cos(BeforeRadian));
        const setX = itemWidth - distance - BeforeDistance;
        //角度チェック
        if(isPositive) {
          x += setX;
        } else {
          x -= setX;
        }
      }

      return {
        x: x,
        y: y
      }
    }

    //正規化（対象の値, 下限値, 上限値）（ある値を 0～1 の範囲に変換する）
    const norm = (v, a, b) => {
      //(対象の値 - 下限値) / (上限値 - 下限値)
      return (v - a) / (b - a);
    }

    //線形補間（下限値, 上限値, 割合）（範囲と割合を渡すと、その割合の位置にある値を返す）
    const lerp = (a, b, t) => {
      //下限値 + (上限値 - 下限値) * 割合
      return a + (b - a) * t;
    }

    //要素の配置
    const setPosition = (elm,angle) => {
      const checkAngle = angle/baseAngle;
      let x,y;
      if(Number.isInteger(checkAngle)) { //整数の場合 baseAngleの角度
        const position = getPosition(angle);
        x = position.x;
        y = position.y;

      } else { //小数点を含む baseAngleの間の角度
        //前後の角度とxy値を取得
        const beforeAngle = baseAngle * Math.floor(checkAngle);
        const afterAngle = baseAngle * Math.ceil(checkAngle);
        const beforePosition = getPosition(beforeAngle);
        const afterPosition = getPosition(afterAngle);

        //正規化（対象の値, 下限値, 上限値）（ある値を 0～1 の範囲に変換する）
        const ratio = norm(angle, beforeAngle, afterAngle);

        //線形補間（下限値, 上限値, 割合）（範囲と割合を渡すと、その割合の位置にある値を返す）
        x = lerp(beforePosition.x, afterPosition.x, ratio);
        y = lerp(beforePosition.y, afterPosition.y, ratio);
      }

      //要素に値を保存 各処理で利用するプロパティ
      elm.angle = angle;
      elm.x = x;
      //style設定
      elm.style.transform = 'translateX(' + x + 'px) translateY(' + y + 'px) rotate(' + angle + 'deg)';
    }

    //要素をセットアップ
    slider.classList.add('is-initialized');

    const resetItems = () => {
      for( let i = 0 ; i < beforeLen ; i ++ ) {
        //先頭が中央に来るように 表示要素より前の複製要素は位置をずらす
        const setAngle = (baseAngle * i) - (baseAngle * beforeLen);
        setPosition(beforeItems[i], setAngle);
      }

      for( let i = 0 ; i < baseAfterItems.length ; i ++ ) {
        const setAngle = baseAngle * i;
        setPosition(baseAfterItems[i], setAngle);
      }
    }
    resetItems();

    //スライダーの高さ設定
    const setSliderHeight = () => {
      //表示スライド数を取得
      const showSlideLen = Math.ceil(winWidth/itemWidth);

      //末端の位置を取得
      const screenEdgeAngle = (showSlideLen / 2) * baseAngle;
      const screenEdgePosi = getPosition(screenEdgeAngle);

      const radian = screenEdgeAngle * Math.PI / 180;
      const tiltHeight = itemWidthHalf * Math.sin(radian);
      slider.style.minHeight = itemHeight + 'px';
      sliderBody.style.minHeight = (itemHeight + screenEdgePosi.y + tiltHeight) + 'px';
    }
    setSliderHeight();


    //無限ループ用　リセット検知
    const resetPointBefore = beforeItems[beforeLen - baseLen];
    const resetPointAfter = afterItems[0];
    const checkResetPosition = () => {
      //スライダーの終了ポイントを過ぎていたら位置を戻す
      if(resetPointBefore.angle >= 0 || resetPointAfter.angle <= 0) {
        resetItems();
      }
    }

    //アクティブ要素変更
    const changeActiveDots = (index) => {
      for (let i = 0; i < baseLen; i++) {
        if(i === index) {
          dotsList[i].classList.add('is-active');
        } else {
          dotsList[i].classList.remove('is-active');
        }
      }
    }
    const changeActiveClass = () => {
      for( let i = 0 ; i < itemsLen ; i ++ ) {
        const elm = items[i];
        if(elm.angle === 0) {
          elm.classList.add('is-active');
          changeActiveDots(Number(elm.dataset.index));
        } else {
          elm.classList.remove('is-active');
        }
      }
    }


    /*
      要素の移動
    */

    //ページャー
    /*
      イージング設定
        ・参考サイト
          https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
          https://noze.space/archives/432#index-3
      「t：アニメーションの経過時間」「b：始点」「c：変化量」「d：変化にかける時間」
    */
    const easing = (t, b, c, d) => {
      //easeOutQuart
      return -c * ((t=t/d-1)*t*t*t - 1) + b;
    }
    //アニメーションスピード取得
    const animeSpeed = slider.dataset.speed ? Number(slider.dataset.speed) : 300;

    //処理の重複回避フラグ
    let isBusy = false;

    //ナビゲーション移動関数
    const moveAnime = (elm,changeAmount,isLast) => {
      const startAngle = elm.angle;

      const start = new Date();
      const move = () => {
        //イベント発生後の経過時間
        let elapsedTime = new Date() - start;

        //アニメーション終了処理
        if (elapsedTime > animeSpeed) {

          //整数値に位置を補正
          setPosition(elm, Math.round(elm.angle));

          if(isLast) {
            //スライダーの終了ポイントを過ぎていたら位置を戻す
            checkResetPosition();

            isBusy = false;

            //アクティブclass変更
            changeActiveClass();


            /*
              スライドアニメーション終了時に1回呼ばれる場所なので、
              アニメーション後に機能拡張する場合はここに記載していく
            */


          }
          return;
        }

        //「アニメーションの経過時間」,「始点」,「変化量」,「変化にかける時間」
        const moveAngle = easing(elapsedTime, startAngle, changeAmount, animeSpeed);
        setPosition(elm, moveAngle);

        elm.requestID = requestAnimationFrame(move);
      }

      elm.requestID = requestAnimationFrame(move);
    }

    //移動関数
    const navMove = (moveAngle) => {
      //アニメーション中だった場合は処理しない
      if(isBusy) {
        return;
      }
      isBusy = true;

      const lastIndex = itemsLen - 1;
      for( let i = 0; i < itemsLen; i ++ ) {
        moveAnime(items[i], moveAngle, i === lastIndex);
      }
    };

    //next prevボタン
    const next = angleSlider.querySelector('.js-angle-slider__next');
    if(next) {
      next.setAttribute('aria-controls',sliderId);
      next.addEventListener('click', () => {
        navMove(-baseAngle);
      });
    }
    const prev = angleSlider.querySelector('.js-angle-slider__prev');
    if(prev) {
      prev.setAttribute('aria-controls',sliderId);
      prev.addEventListener('click', () => {
        navMove(baseAngle);
      });
    }


    //ドットナビゲーション生成
    const dotsInitialize = () => {
      if(!isDots) {
        return
      }
      //要素の生成・挿入
      const ul = document.createElement('ul');
      ul.className = 'js-angle-slider__dots-list';
      ul.setAttribute('role', 'tablist');
      ul.setAttribute('aria-label', 'Select a slide to show');

      const listItems = [];
      for (let i = 0; i < baseLen; i++) {
        const li = document.createElement('li');
        li.className = 'js-angle-slider__dots-item';
        li.setAttribute('role', 'presentation');

        const button = document.createElement('button');
        button.className = 'js-angle-slider__dots-button';
        if(i === 0) {
          button.className += ' is-active';
        }

        button.setAttribute('type','button');
        button.setAttribute('data-index',i);

        button.setAttribute('aria-label','Go to slide '+(i + 1));
        button.setAttribute('aria-controls',sliderId);
        button.setAttribute('role', 'tab');
        dotsList.push(button);

        li.append(button);
        listItems.push(li);
      }
      ul.append(...listItems);

      //反映場所チェック
      let appendArea = angleSlider.querySelector('.js-angle-slider__dots');
      if(!appendArea) {
        appendArea = document.createElement('div');
        appendArea.className = 'js-angle-slider__dots';
        sliderBody.append(appendArea);
      }
      appendArea.append(ul);

      //クリックイベント
      for (let i = 0; i < baseLen; i++) {
        const button = dotsList[i];
        button.addEventListener('click', ()=> {
          if(button.classList.contains('is-active')) {
            return;
          }
          changeActiveDots();
          const target = baseItems[Number(button.dataset.index)];
          navMove(-target.angle);
        });
      }
    }
    dotsInitialize();


    /*
      スワイプ、ドラッグ対応
    */
    //クリック、タッチされているか判別
    let isDown = false;
    // クリック開始位置
    let startX;
    //移動距離
    let moveX;
    //移動中の前回の移動距離
    let beforeX;

    //スワイプ、ドラッグで右に動かしているか判別
    let isRightMove = false;

    //ドラッグ中のスピード調整
    const dragSpeedRatio = slider.dataset.dragSpeedRatio ? Number(slider.dataset.dragSpeedRatio) : 0.1;

    //マウスダウン、タッチスタート（移動開始）
    const startFunc = e => {
      e.preventDefault();
      //画面上のx位置を取得
      if(e.type === 'touchstart') {
        startX = e.changedTouches[0].pageX;
      } else {
        startX = e.pageX;
      }

      //スライダーにclass追加
      slider.classList.add('is-drag');
      isDown = true;

      //マウスポインタを変更
      slider.style.cursor = 'grabbing';

      //初期化
      beforeX = 0;
    }

    //マウスムーブ、タッチムーブ（移動中）
    const moveFunc = e => {
      //マウスダウン、タッチスタート時のみ処理
      if(!isDown) {
        return;
      }
      e.preventDefault();

      //移動距離を取得
      if(e.type === 'touchmove') {
        moveX = startX - e.changedTouches[0].pageX;
      } else {
        moveX = startX - e.pageX;
      }

      //左右どちらに移動しているか判別
      if(moveX < 0) {
        isRightMove = true;
      } else {
        isRightMove = false;
      }

      //スライダーを移動させる
      let changeAngle = (moveX - beforeX) * dragSpeedRatio;
      for( let i = 0 ; i < itemsLen ; i ++ ) {
        const elm = items[i];
        elm.requestID = requestAnimationFrame(() => {
          setPosition(elm,elm.angle - changeAngle);
        });
      }

      //スライダーの終了ポイントを過ぎていたら位置を戻す
      checkResetPosition();

      //移動距離を保存
      beforeX = moveX;
    }

    //マウスアップ、タッチエンド（移動終了）
    const endFunc = e => {
      e.preventDefault();
      //設定をリセット
      slider.classList.remove('is-drag');
      isDown = false;

      //マウスポインタを変更
      slider.style.cursor = 'grab';


      //ドラッグ後の位置調整
      const approximateAngle = [];
      for( let i = 0 ; i < itemsLen ; i ++ ) {
        //頂点に近い要素を判別（data-angle=""により近い角度を取得）
        const elm = items[i];
        const checkAngle = Math.abs(elm.angle/baseAngle);
        if(checkAngle < 1 && checkAngle !== 0) {
          approximateAngle.push(elm.angle);
        }
      }
      //少しでも動いていたら処理
      if(approximateAngle.length > 0) {
        const approximateAngleLeft = approximateAngle[0];
        const approximateAngleRight = approximateAngle[1];

        //設定値より大きく動いていたらその方向へ動かす
        const isMoveSetPoint = Math.abs(moveX) > 40;
        if(isRightMove && isMoveSetPoint) {
          navMove(-approximateAngleLeft);
          return;
        }
        if(!isRightMove && isMoveSetPoint) {
          navMove(-approximateAngleRight);
          return;
        }

        //設定値以下は近い方へ戻す
        if(Math.abs(approximateAngleLeft) > Math.abs(approximateAngleRight)) {
          navMove(-approximateAngleRight);
        } else {
          navMove(-approximateAngleLeft);
        }
      }
    }

    //スワイプ対応
    slider.addEventListener('touchstart', startFunc);
    slider.addEventListener('touchmove', moveFunc);
    slider.addEventListener('touchend', endFunc);

    //マウスドラッグ対応
    slider.addEventListener('mouseenter', () => {
      //マウスポインタを変更
      slider.style.cursor = 'grab';
    });
    slider.addEventListener('mousedown', startFunc);
    slider.addEventListener('mousemove', moveFunc);
    slider.addEventListener('mouseup', endFunc);
    slider.addEventListener('mouseleave', endFunc);


    /*
      レスポンシブ対応
    */
    //表示エリアリサイズ監視 ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      //ベース値を更新して再配置
      getBaseVal();
      for( let i = 0 ; i < itemsLen ; i ++ ) {
        const elm = items[i];
        elm.requestID = requestAnimationFrame(() => {
          setPosition(elm,elm.angle);
        });
      }
      setSliderHeight();
    });
    //リサイズ監視開始
    resizeObserver.observe(slider);

  });
}
angleSlider();