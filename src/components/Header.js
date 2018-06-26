import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="section">
          <div>
              <div className="logo">
                <img src="/pctrs/logo.png" border="0" alt='' />
              </div>
              <div className="Header-menu">
                  <a className="About" href="#About">
                      <img src="/pctrs/Menu_About_big.png" className="main" border="0" alt="О нас" />
                      <div className="text">
                          <img src="/pctrs/Menu_About-text.png" border="0" alt="О нас" />
                      </div>
                      <img src="/pctrs/Menu_About-img1.png" className="img-animated img1" border="0" alt="О нас" />
                      <img src="/pctrs/Menu_About-img2.png" className="img-animated img2" border="0" alt="О нас" />
                      <img src="/pctrs/Menu_About-img3.png" className="img-animated img3" border="0" alt="О нас" />
                  </a>
                  <a className="Seminars" href="#Seminars">
                      <img src="/pctrs/Menu_Seminars_big.png" className="main" border="0"  alt="Семинары" />
                      <div className="text">
                          <img src="/pctrs/Menu_Seminars-text.png" border="0" alt="О нас" />
                      </div>
                      <img src="/pctrs/Menu_Seminars-img1.png" className="img-animated img1" border="0" alt="Семинары" />
                      <img src="/pctrs/Menu_Seminars-img2.png" className="img-animated img2" border="0" alt="Семинары" />
                  </a>
                  <a className="Calendar" href="#Calendar">
                      <img src="/pctrs/Menu_Calendar_big.png" className="main" border="0"  alt="Календарь событий" />
                      <div className="text">
                          <img src="/pctrs/Menu_Calendar-text.png" border="0" alt="Календарь событий" />
                      </div>
                      <img src="/pctrs/Menu_Calendar-img1.png" className="img-animated img1" border="0" alt="Календарь событий" />
                      <img src="/pctrs/Menu_Calendar-img2.png" className="img-animated img2" border="0" alt="Календарь событий" />
                      <img src="/pctrs/Menu_Calendar-img3.png" className="img-animated img3" border="0" alt="Календарь событий" />
                  </a>
                  <a className="Photo" href="#Photo">
                      <img src="/pctrs/Menu_Photo_big.png" className="main" border="0"  alt="Фотогалерея" />
                      <div className="text">
                          <img src="/pctrs/Menu_Photo-text.png" border="0" alt="Фотогалерея" />
                      </div>
                      <img src="/pctrs/Menu_Photo-img1.png" className="img-animated img1" border="0" alt="Фотогалерея" />
                      <img src="/pctrs/Menu_photo-img2.png" className="img-animated img2" border="0" alt="Фотогалерея" />
                      <img src="/pctrs/Menu_Photo-img3.png" className="img-animated img3" border="0" alt="Фотогалерея" />
                      <img src="/pctrs/Menu_photo-img4.png" className="img-animated img4" border="0" alt="Фотогалерея" />
                      <img src="/pctrs/Menu_Photo-img5.png" className="img-animated img5" border="0" alt="Фотогалерея" />
                      <img src="/pctrs/Menu_photo-img6.png" className="img-animated img6" border="0" alt="Фотогалерея" />
                  </a>
                  <a className="Contacts" href="#Contacts">
                      <img src="/pctrs/Menu_Contacts_big.png" className="main" border="0"  alt="Контакты" />
                      <div className="text">
                          <img src="/pctrs/Menu_Contacts-text.png" border="0" alt="Контакты" />
                      </div>
                      <img src="/pctrs/Menu_Contacts-img1.png" className="img-animated img1" border="0" alt="Контакты" />
                  </a>
              </div>
          </div>
      </header>
    );
  }

}

export default Header;
