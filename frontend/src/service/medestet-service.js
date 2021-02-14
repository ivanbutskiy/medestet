import axios from 'axios';

class MedestetService {

    API_BASE = 'http://localhost:8000';
    DOMAIN_NAME = 'www.medestet.ru';
    SERVICE_URL = 'www.medestet.ru';

    // TODO Исправить DOMAIN_NAME и SERVICE_URL

    config = () => {
        if (localStorage.getItem('access')) {
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            }
        } else {
            return {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        }
    };

    getResource = async (url, ...args) => {
        const response = await axios.get(`${this.API_BASE}${url}`, this.config());
        if (!response.status === 200) {
            throw new Error('Could not axios url.');
        };
        return await response;
    };

    getCoursesList = () => {
        const result = this.getResource('/api/courses/');
        return result;
    };

    getCourseDetail = (slug) => {
        const result = this.getResource(`/api/courses/${slug}/`);
        return result;
    };

    getWorkshopsList = () => {
        const result = this.getResource('/api/workshops/');
        return result;
    };

    getWorkshopDetail = (slug) => {
        const result = this.getResource(`/api/workshops/${slug}/`);
        return result;
    };

    getWebinarsList = () => {
        const result = this.getResource('/api/webinars/');
        return result;
    };

    getWebinarDetail = (slug) => {
        const result = this.getResource(`/api/webinars/${slug}/`);
        return result;
    };

    getShopCategoriesList = () => {
        const result = this.getResource(`/api/shop/categories/`);
        return result;
    };

    getAllProducts = (page=undefined) => {
        if (page) {
            const result = this.getResource(`/api/shop/products/?page=${page}`);
            return result;
        } else {
            const result = this.getResource(`/api/shop/products/`);
            return result;
        };
    };

    getProductsByCategory = (categorySlug, page=undefined) => {

        if (page) {
            const result = this.getResource(`/api/shop/categories/${categorySlug}/?page=${page}`);
            return result;
        } else {
            const result = this.getResource(`/api/shop/categories/${categorySlug}/`);
            return result;
        };
    };

    getProductDetail = (slug) => {
        const result = this.getResource(`/api/shop/products/${ slug }/`);
        return result;
    };

    checkPromoCode(promoCode) {
        const result = this.getResource(`/api/shop/check-promocode/${ promoCode }/`);
        return result;
    };

    getShopPaymentMethods() {
        const result = this.getResource(`/api/shop/payments/`);
        return result;
    };

    getShopDeliveryMethods() {
        const result = this.getResource(`/api/shop/delivery/`);
        return result;
    };

    orderRegister = async (
            orderReference,
            amount,
            clientLastName,
            clientFirstName,
            clientPhone,
            clientEmail,
            clientRegion,
            clientDistrict,
            clientCity,
            selectedDeliveryId,
            deliveryAddress,
            promocode,
            orderDate,
            products
        ) => {
            const url = `${this.API_BASE}/api/shop/order/new/`;
            const data = {
                order_reference: orderReference,
                order_sum: amount,
                last_name: clientLastName,
                first_name: clientFirstName,
                phone: clientPhone,
                email: clientEmail,
                region: clientRegion,
                district: clientDistrict,
                city: clientCity,
                delivery_id: selectedDeliveryId,
                delivery_office: deliveryAddress,
                promocode: promocode,
                products: products,
                merchant_order_date: orderDate
            };
            const response = await axios.post(url, data, this.config());
            return response;
    };

    getPaymentCore() {
        const result = this.getResource('/api/merchant/');
        return result;
    };

    updateUserData = async (
            id,
            email,
            lastName,
            firstName,
            patronym,
            phone
        ) => {
        const url = `${this.API_BASE}/api/accounts/update/${id}/`;
        const data = {
            email: email,
            first_name: firstName,
            last_name: lastName,
            patronym: patronym,
            phone: phone
        };
        const response = await axios.patch(url, data, this.config());
        return response;
    };

    changePassword = async (
        currentPassword, 
        newPassword, 
        reNewPassword) => {
            const url = `${this.API_BASE}/auth/users/set_password/`;
            const data = {
                new_password: newPassword,
                re_new_password: reNewPassword,
                current_password: currentPassword
            };
            const response = await axios.post(url, data, this.config());
            return response;
    };

    getUserCourses() {
        const result = this.getResource('/api/courses/user-courses/');
        return result;
    };
    
    getUserWatchCourse(slug) {
        const result = this.getResource(`/api/courses/user-courses/${ slug }/`);
        return result;
    };
    
    getLessonDetail(courseSlug, lessonId) {
        const result = this.getResource(`/api/courses/lesson-detail/${ courseSlug }/${ lessonId }/`);
        return result;
    };

    checkFreeWebinar = async (webinarId) => {
        const url = `${ this.API_BASE }/api/webinars/order/check-free-service-url/`;
        const data = {
            webinarId: webinarId
        };
        const response = await axios.post(url, data, this.config());
        return response;
    };

    getUserWebinars() {
        const result = this.getResource('/api/webinars/user-webinars/');
        return result;
    };

    getUserWatchWebinar(slug) {
        const result = this.getResource(`/api/webinars/user-webinars/${ slug }/`);
        return result;
    };

};

export default MedestetService;
