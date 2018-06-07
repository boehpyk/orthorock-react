import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
        <section className="section-about">
            <h1>О нас</h1>
            <div className="content">
                <ul>
                    <li>
                        Расскажем о самом интересном в мире ортодонтии
                    </li>
                    <li>
                        Научим самым передовым технологиям
                    </li>
                    <li>
                        Откроем секреты и know-how известных ортодонтов страны
                    </li>
                    <li>
                        Познакомим с важными людьми в нашей сфере
                    </li>
                </ul>
            </div>
        </section>
    );
  }
}

export default About;
