
import { message } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { setRefreshTokenAction } from "../../redux/slice/accountSlide";
import { useDispatch, useSelector } from "react-redux";

const LayoutApp = (props) => {
    const isRefreshToken = useSelector((state) => state.account.isRefreshToken);
    const errorRefreshToken = useSelector((state) => state.account.errorRefreshToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Handle refresh token error
    useEffect(() => {
        if (isRefreshToken === true) {
            localStorage.removeItem("access_token");
            message.error(errorRefreshToken);
            dispatch(setRefreshTokenAction({ status: false, message: "" }));
            navigate("/login");
        }
    }, [isRefreshToken, errorRefreshToken, dispatch, navigate]);

    return <>{props.children}</>;
};
LayoutApp.propTypes = {
    children: PropTypes.node,
};

export default LayoutApp;
