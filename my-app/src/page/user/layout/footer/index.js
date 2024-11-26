import { memo } from "react";
import { Router, Link } from "react-router-dom";
import '../../../../style/user/footer.css';

const SendEmail = () => {
    return (
        <div className="send-container">
            <input className="input-text"
                type="search"
                placeholder=""
            />
            <img className="send-icon" src="send_icon.png" alt="send_icon" />
        </div>

    );
};

const Icon = () => {
    return (
        <div className="icon-container">
            <img className="search-icon" src="fb.png" alt="fb" />
            <img className="search-icon" src="ig.png" alt="ig" />
            <img className="search-icon" src="tiktok.png" alt="tictoc" />
        </div>
    );
};

const About = () => {
    return (
        <div className="about-container">
            <p> Gửi email để nhận thông báo</p>
            <SendEmail />
            <Icon />
        </div>
    );
};

const Footer = () => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Về chúng tôi</th>
                        <th>Hỗ trợ khách hàng</th>
                        <th>Mở rộng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Viết sau
                        </td>
                        <td>
                            <Link to="/link3">Trang chủ</Link>
                            <Link to="/link4">Giới thiệu</Link>
                            <Link to="/link5">Sản phẩm</Link>
                            <Link to="/link6">Tin tức</Link>
                            <Link to="/link7">Liên hệ</Link>

                        </td>
                        <td>
                            <About />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div >
    );

}

export default memo(Footer);