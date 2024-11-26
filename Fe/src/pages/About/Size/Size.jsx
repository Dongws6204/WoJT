import React from 'react';
import './size.css'

const Size = () => {
    return (
        <>
            <div className="main-content">
                <div className="page-title">
                    <h1>HƯỚNG DẪN CHỌN SIZE</h1>
                </div>
                <div className="tabcontent2" id="sizenu" style={{}}>
                    <h3>BẢNG SIZE CHUNG CHO NỮ </h3>
                    <p><i>* Đơn vị tính: cm, kg </i> </p>
                    <table border={1} cellPadding={0} cellSpacing={0} style={{ width: '100%', marginBottom:'26px' }} className="table-size">
                        <colgroup>
                            <col width="20%" />
                            <col span width="15%" />
                            <col span width={79} />
                        </colgroup>
                        <tbody style={{ textAlign: 'center' }}>
                            <tr style={{ fontWeight: 700 }}>
                                <td className="xl67" height={20} width="20%">Size</td>
                                <td className="xl69" width={79}>XS</td>
                                <td className="xl69" width={79}>S</td>
                                <td className="xl66" width={79}>M</td>
                                <td className="xl66" width={79}>L</td>
                                <td className="xl66" width={79}>XL</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Chiều cao</td>
                                <td className="xl71" width={79}>147-153</td>
                                <td className="xl71" width={79}>150-155</td>
                                <td className="xl64" width={79}>155-163</td>
                                <td className="xl64" width={79}>160-165</td>
                                <td className="xl64" width={79}>162-166</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Cân nặng</td>
                                <td className="xl71" width={79}>38-43 kg</td>
                                <td className="xl71" width={79}>41-46 kg</td>
                                <td className="xl64" width={79}>47-52 kg</td>
                                <td className="xl64" width={79}>53-58 kg</td>
                                <td className="xl64" width={79}>59-64 kg</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Vòng ngực</td>
                                <td className="xl71" width={79}>74-80</td>
                                <td className="xl71" width={79}>79-82</td>
                                <td className="xl64" width={79}>82-87</td>
                                <td className="xl64" width={79}>88-94</td>
                                <td className="xl64" width={79}>94-99</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Vòng mông</td>
                                <td className="xl71" width={79}>82-88</td>
                                <td className="xl71" width={79}>88-90</td>
                                <td className="xl64" width={79}>90-94</td>
                                <td className="xl64" width={79}>94-98</td>
                                <td className="xl64" width={79}>98-102</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="tabcontent" id="sizeNu1" style={{}}>
                        <table border={1} cellPadding={0} cellSpacing={0} style={{ width: '100%' }}>
                            <tbody style={{ textAlign: 'center' }}>
                                <tr style={{ fontWeight: 700 }}>
                                    <td className="xl68" width={40}>Size</td>
                                    <td className="xl71" width="15%">26 (XS)</td>
                                    <td className="xl71" width="15%">27 (S)</td>
                                    <td className="xl67" width="15%">28 (M)</td>
                                    <td className="xl67" width="15%">29 (L)</td>
                                    <td className="xl67" width="15%">30 (XL)</td>
                                </tr>
                                <tr>
                                    <td className="xl63" width={40}>Vòng eo</td>
                                    <td className="xl70" width="15%">65</td>
                                    <td className="xl65" width="15%">67.5</td>
                                    <td className="xl65" width="15%">70</td>
                                    <td className="xl65" width="15%">72.5</td>
                                    <td className="xl65" width="15%">75</td>
                                </tr>
                                <tr>
                                    <td className="xl63" width={40}>Vòng mông (dáng slim)</td>
                                    <td className="xl70" width="15%">79</td>
                                    <td className="xl65" width="15%">81.5</td>
                                    <td className="xl65" width="15%">84</td>
                                    <td className="xl65" width="15%">86.5</td>
                                    <td className="xl65" width="15%">89</td>
                                </tr>
                                <tr>
                                    <td className="xl63" width={40}>Vòng mông (dáng regular)</td>
                                    <td className="xl70" width="15%">86.92</td>
                                    <td className="xl65" width="15%">89.46</td>
                                    <td className="xl65" width="15%">92</td>
                                    <td className="xl65" width="15%">94.5</td>
                                    <td className="xl65" width="15%">97.1</td>
                                </tr>
                                <tr>
                                    <td className="xl63" width={40}>Chiều dài quần</td>
                                    <td className="xl70" width="15%">93</td>
                                    <td className="xl65" width="15%">94</td>
                                    <td className="xl65" width="15%">95</td>
                                    <td className="xl65" width="15%">96</td>
                                    <td className="xl65" width="15%">97</td>
                                </tr>
                                <tr>
                                    <td className="xl63" width={40}>Rộng gấu (dáng slim)</td>
                                    <td className="xl70" width="15%">12.5</td>
                                    <td className="xl65" width="15%">13</td>
                                    <td className="xl65" width="15%">13.5</td>
                                    <td className="xl65" width="15%">14</td>
                                    <td className="xl65" width="15%">14.5</td>
                                </tr>
                                <tr>
                                    <td className="xl63" width={40}>Rộng gấu (dáng regular)</td>
                                    <td className="xl70" width="15%" colSpan={5}>Tùy mẫu kích thước khác nhau</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h3>Quần Jeans - Khaki</h3>
                    <table border={1} cellPadding={0} cellSpacing={0} style={{ width: '100%' }}><colgroup><col width="20%" /> <col span={4} width="15%" /> </colgroup>
                        <tbody style={{ textAlign: 'center' }}>
                            <tr style={{ fontWeight: 700 }}>
                                <td className="xl67" height={40} width="20%">Size</td>
                                <td className="xl66" width="15%">26 (XS)</td>
                                <td className="xl66" width="15%">27 (S)</td>
                                <td className="xl66" width="15%">28 (M)</td>
                                <td className="xl66" width="15%">29 (L)</td>
                                <td className="xl66" width="15%">30 (XL)</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Vòng bụng</td>
                                <td className="xl64" width="15%">65</td>
                                <td className="xl64" width="15%">67.5</td>
                                <td className="xl64" width="15%">70</td>
                                <td className="xl64" width="15%">72.5</td>
                                <td className="xl64" width="15%">75</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Vòng mông</td>
                                <td className="xl64" width="15%">79</td>
                                <td className="xl64" width="15%">81.5</td>
                                <td className="xl64" width="15%">84</td>
                                <td className="xl64" width="15%">86.5</td>
                                <td className="xl64" width="15%">89</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Chiều dài quần</td>
                                <td className="xl64" width="15%">93</td>
                                <td className="xl64" width="15%">94</td>
                                <td className="xl64" width="15%">95</td>
                                <td className="xl64" width="15%">96</td>
                                <td className="xl64" width="15%">97</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Rộng ống (dáng slim)</td>
                                <td className="xl64" width="15%">12.5</td>
                                <td className="xl64" width="15%">13</td>
                                <td className="xl64" width="15%">13.5</td>
                                <td className="xl64" width="15%">14</td>
                                <td className="xl64" width="15%">14.5</td>
                            </tr>
                            <tr>
                                <td className="xl63" width={40}>Rộng gấu (dáng regular)</td>
                                <td className="xl70" width="15%" colSpan={5}>Tùy mẫu kích thước khác nhau</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="tabcontent2" id="sizenam" style={{}}>
                    <h3>BẢNG SIZE CHUNG CHO Nam </h3>
                    <p><i>* Đơn vị tính: cm, kg</i></p>
                    <table border={1} cellPadding={0} cellSpacing={0} style={{ width: '100%' }}>
                        <tbody style={{ textAlign: 'center' }}>
                            <tr style={{ fontWeight: 700 }}>
                                <td className="xl67" height={20} width="20%">Size</td>
                                <td className="xl66" width="15%">S</td>
                                <td className="xl66" width="15%">M</td>
                                <td className="xl66" width="15%">L</td>
                                <td className="xl66" width="15%">XL</td>
                                <td className="xl66" width="15%">XXL</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Chiều cao</td>
                                <td className="xl64" width="15%">162-168</td>
                                <td className="xl64" width="15%">169-173</td>
                                <td className="xl64" width="15%">171-175</td>
                                <td className="xl64" width="15%">173-177</td>
                                <td className="xl64" width="15%">175-179</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Cân nặng</td>
                                <td className="xl64" width="15%">57-62 kg</td>
                                <td className="xl64" width="15%">63-67 kg</td>
                                <td className="xl64" width="15%">68-72 kg</td>
                                <td className="xl64" width="15%">73-77 kg</td>
                                <td className="xl64" width="15%">78-82 kg</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Vòng ngực</td>
                                <td className="xl64" width="15%">84-88</td>
                                <td className="xl64" width="15%">88-94</td>
                                <td className="xl64" width="15%">94-98</td>
                                <td className="xl64" width="15%">98-104</td>
                                <td className="xl64" width="15%">104-107</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Vòng mông</td>
                                <td className="xl64" width="15%">85-89</td>
                                <td className="xl64" width="15%">90-94</td>
                                <td className="xl64" width="15%">95-99</td>
                                <td className="xl64" width="15%">100-104</td>
                                <td className="xl64" width="15%">104-108</td>
                            </tr>
                        </tbody>
                    </table>
                    <h3>Quần Jeans - Khaki</h3>
                    <table border={1} cellPadding={0} cellSpacing={0} style={{ width: '100%' }}><colgroup><col width="20%" /> <col span={4} width="15%" /> </colgroup>
                        <tbody style={{ textAlign: 'center' }}>
                            <tr style={{ fontWeight: 700 }}>
                                <td className="xl67" height={40} width="20%">Size</td>
                                <td className="xl66" width="15%">29 (S)</td>
                                <td className="xl66" width="15%">30 (M)</td>
                                <td className="xl66" width="15%">31 (L)</td>
                                <td className="xl66" width="15%">32 (XL)</td>
                                <td className="xl64" width="15%">33 (XXL)</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Vòng eo</td>
                                <td className="xl64" width="15%">79.5</td>
                                <td className="xl64" width="15%">82</td>
                                <td className="xl64" width="15%">84.5</td>
                                <td className="xl64" width="15%">87</td>
                                <td className="xl64" width="15%">89</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Vòng mông</td>
                                <td className="xl64" width="15%">96.5</td>
                                <td className="xl64" width="15%">99</td>
                                <td className="xl64" width="15%">101.5</td>
                                <td className="xl64" width="15%">104</td>
                                <td className="xl64" width="15%">106.5</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Chiều dài quần</td>
                                <td className="xl64" width="15%">99.8</td>
                                <td className="xl64" width="15%">100.5</td>
                                <td className="xl64" width="15%">101.2</td>
                                <td className="xl64" width="15%">101.2</td>
                                <td className="xl64" width="15%">101.2</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Rộng ống (dáng slim)</td>
                                <td className="xl64" width="15%">15.4</td>
                                <td className="xl64" width="15%">16</td>
                                <td className="xl64" width="15%">16.6</td>
                                <td className="xl64" width="15%">17.2</td>
                                <td className="xl64" width="15%">17.8</td>
                            </tr>
                            <tr>
                                <td className="xl63" width={40}>Rộng gấu (dáng regular)</td>
                                <td className="xl70" width="15%" colSpan={5}>Tùy mẫu kích thước khác nhau</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="tabcontent2" id="sizebetrai" style={{}}>
                    <h3>BẢNG SIZE CHUNG TRẺ EM sản phẩm từ Thu Đông 2023</h3>
                    <table border={1} cellPadding={0} cellSpacing={0} style={{ width: '100%' }}>
                        <tbody style={{ textAlign: 'center' }}>
                            <tr style={{ fontWeight: 700 }}>
                                <td className="xl67" height={20} width="20%">Size</td>
                                <td className="xl66" width="8%">98<br />(2-2Y)</td>
                                <td className="xl66" width="8%">104<br />(3-4Y)</td>
                                <td className="xl66" width="8%">110<br />(4-5Y)</td>
                                <td className="xl66" width="8%">116<br />(6Y)</td>
                                <td className="xl66" width="8%">122<br />(7Y)</td>
                                <td className="xl66" width="8%">128<br />(8Y)</td>
                                <td className="xl66" width="8%">134<br />(9Y)</td>
                                <td className="xl66" width="8%">140<br />(10-11Y)</td>
                                <td className="xl66" width="8%">152<br />(11-12Y)</td>
                                <td className="xl66" width="8%">164<br />(13-14Y)</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Chiều cao (cm)</td>
                                <td className="xl66" width="8%">95-101</td>
                                <td className="xl66" width="8%">101-107</td>
                                <td className="xl66" width="8%">107-113</td>
                                <td className="xl66" width="8%">113-119</td>
                                <td className="xl66" width="8%">119-125</td>
                                <td className="xl66" width="8%">125-131</td>
                                <td className="xl66" width="8%">131-137</td>
                                <td className="xl66" width="8%">137-145</td>
                                <td className="xl66" width="8%">145-157</td>
                                <td className="xl66" width="8%">157-169</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Cân nặng (kg)</td>
                                <td className="xl66" width="8%">13-15</td>
                                <td className="xl66" width="8%">15-18</td>
                                <td className="xl66" width="8%">18-22</td>
                                <td className="xl66" width="8%">22-25</td>
                                <td className="xl66" width="8%">25-28</td>
                                <td className="xl66" width="8%">28-32</td>
                                <td className="xl66" width="8%">32-36</td>
                                <td className="xl66" width="8%">36-39</td>
                                <td className="xl66" width="8%">39-46</td>
                                <td className="xl66" width="8%">46-55</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="tabcontent2" id="sizebetrai" style={{}}>
                    <h3>BẢNG SIZE CHUNG CHO Bé trai </h3>
                    <table border={1} cellPadding={0} cellSpacing={0} style={{ width: '100%' }}>
                        <tbody style={{ textAlign: 'center' }}>
                            <tr style={{ fontWeight: 700 }}>
                                <td className="xl67" height={20} width="20%">Size</td>
                                <td className="xl66" width="10%">90<br />(2Y)</td>
                                <td className="xl66" width="10%">100<br />(3-4Y)</td>
                                <td className="xl66" width="10%">110<br />(4-5Y)</td>
                                <td className="xl66" width="10%">120<br />(6-7Y)</td>
                                <td className="xl66" width="10%">130<br />(8Y)</td>
                                <td className="xl66" width="10%">140<br />(10-11Y)</td>
                                <td className="xl66" width="10%">150<br />(11-12Y)</td>
                                <td className="xl66" width="10%">160<br />(13-14Y)</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Chiều cao (cm)</td>
                                <td className="xl66" width="10%">90</td>
                                <td className="xl66" width="10%">100</td>
                                <td className="xl66" width="10%">110</td>
                                <td className="xl66" width="10%">120</td>
                                <td className="xl66" width="10%">130</td>
                                <td className="xl66" width="10%">140</td>
                                <td className="xl66" width="10%">150</td>
                                <td className="xl66" width="10%">160</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Cân nặng (kg)</td>
                                <td className="xl66" width="10%">10-13</td>
                                <td className="xl66" width="10%">14-17</td>
                                <td className="xl66" width="10%">18-23</td>
                                <td className="xl66" width="10%">24-29</td>
                                <td className="xl66" width="10%">29-33</td>
                                <td className="xl66" width="10%">33-39</td>
                                <td className="xl66" width="10%">39-45</td>
                                <td className="xl66" width="10%">45-52</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="tabcontent2" id="sizebegai" style={{}}>
                    <h3>BẢNG SIZE CHUNG CHO Bé gái </h3>
                    <table border={1} cellPadding={0} cellSpacing={0} style={{ width: '100%' }}>
                        <tbody style={{ textAlign: 'center' }}>
                            <tr style={{ fontWeight: 700 }}>
                                <td className="xl67" height={20} width="20%">Size</td>
                                <td className="xl66" width="10%">90<br />(2Y)</td>
                                <td className="xl66" width="10%">100<br />(3-4Y)</td>
                                <td className="xl66" width="10%">110<br />(4-5Y)</td>
                                <td className="xl66" width="10%">120<br />(6-7Y)</td>
                                <td className="xl68" width="10%">130<br />(8Y)</td>
                                <td className="xl68" width="10%">140<br />(10-11Y)</td>
                                <td className="xl70" width="10%">150<br />(11-12Y)</td>
                                <td className="xl71" width="10%">160<br />(13-14Y)</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Chiều cao (cm)</td>
                                <td className="xl66" width="10%">90</td>
                                <td className="xl66" width="10%">100</td>
                                <td className="xl66" width="10%">110</td>
                                <td className="xl66" width="10%">120</td>
                                <td className="xl68" width="10%">130</td>
                                <td className="xl68" width="10%">140</td>
                                <td className="xl70" width="10%">150</td>
                                <td className="xl71" width="10%">160</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Cân nặng (kg)</td>
                                <td className="xl66" width="10%">10-13</td>
                                <td className="xl66" width="10%">14-17</td>
                                <td className="xl66" width="10%">18-23</td>
                                <td className="xl66" width="10%">24-29</td>
                                <td className="xl68" width="10%">29-33</td>
                                <td className="xl68" width="10%">33-39</td>
                                <td className="xl70" width="10%">39-45</td>
                                <td className="xl71" width="10%">45-50</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="tabcontent2" id="sizeunisex" style={{ display: 'block' }}>
                    <h3>BẢNG SIZE CHUNG CHO UNISEX - Người lớn</h3>
                    <table border={1} cellPadding={0} cellSpacing={0} style={{ width: '100%' }}>
                        <tbody style={{ textAlign: 'center' }}>
                            <tr style={{ fontWeight: 700 }}>
                                <td className="xl67" height={20} width="20%">Size</td>
                                <td className="xl66" width="11%">XXS</td>
                                <td className="xl66" width="11%">XS</td>
                                <td className="xl66" width="11%">S</td>
                                <td className="xl66" width="11%">M</td>
                                <td className="xl66" width="11%">L</td>
                                <td className="xl66" width="11%">XL</td>
                                <td className="xl66" width="11%">XXL</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Chiều cao (cm)</td>
                                <td className="xl66" width="11%">155 - 163</td>
                                <td className="xl66" width="11%">160 - 165</td>
                                <td className="xl66" width="11%">162 - 168</td>
                                <td className="xl66" width="11%">169 - 173</td>
                                <td className="xl66" width="11%">171 - 175</td>
                                <td className="xl66" width="11%">173 - 177</td>
                                <td className="xl66" width="11%">175 - 179</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Cân nặng (kg)</td>
                                <td className="xl66" width="11%">47 - 52</td>
                                <td className="xl66" width="11%">53 - 58</td>
                                <td className="xl66" width="11%">57 - 62</td>
                                <td className="xl66" width="11%">63 - 67</td>
                                <td className="xl66" width="11%">68 - 72</td>
                                <td className="xl66" width="11%">73 - 77</td>
                                <td className="xl66" width="11%">79 - 82</td>
                            </tr>
                        </tbody>
                    </table>
                    <h3>BẢNG SIZE CHUNG CHO UNISEX - trẻ em</h3>
                    <table border={1} cellPadding={0} cellSpacing={0} style={{ width: '100%' }}>
                        <tbody style={{ textAlign: 'center' }}>
                            <tr style={{ fontWeight: 700 }}>
                                <td className="xl67" height={20} width="20%">Size</td>
                                <td className="xl66" width="10%">90<br />(2Y)</td>
                                <td className="xl66" width="10%">100<br />(3-4Y)</td>
                                <td className="xl66" width="10%">110<br />(4-5Y)</td>
                                <td className="xl66" width="10%">120<br />(6-7Y)</td>
                                <td className="xl66" width="10%">130<br />(8Y)</td>
                                <td className="xl66" width="10%">140<br />(10-11Y)</td>
                                <td className="xl66" width="10%">150<br />(11-12Y)</td>
                                <td className="xl66" width="10%">160<br />(13-14Y)</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Chiều cao (cm)</td>
                                <td className="xl66" width="10%">90</td>
                                <td className="xl66" width="10%">100</td>
                                <td className="xl66" width="10%">110</td>
                                <td className="xl66" width="10%">120</td>
                                <td className="xl66" width="10%">130</td>
                                <td className="xl66" width="10%">140</td>
                                <td className="xl66" width="10%">150</td>
                                <td className="xl66" width="10%">160</td>
                            </tr>
                            <tr>
                                <td className="xl63" height={20} width="20%">Cân nặng (kg)</td>
                                <td className="xl66" width="10%">10 - 13</td>
                                <td className="xl66" width="10%">14 - 17</td>
                                <td className="xl66" width="10%">18 - 23</td>
                                <td className="xl66" width="10%">24 - 29</td>
                                <td className="xl66" width="10%">29 - 33</td>
                                <td className="xl66" width="10%">33 - 39</td>
                                <td className="xl66" width="10%">39 - 45</td>
                                <td className="xl66" width="10%">45 - 52</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
};

export default Size;