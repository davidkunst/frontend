

import apiInstance from './apiConfig';

//* -------------------------------------------------------------- //
//*                    AUTHENTICATION ENDPOINTS                    //
//* -------------------------------------------------------------- //
function login(data) {
    return apiInstance.post('/api/v1/auth/login', data);
}
function isValidEmail(email) {
    return apiInstance.get(`/api/v1/auth/validEmail?email=${email}`);
}
function register(user) {
    return apiInstance.post('/api/v1/auth/register', user);
}
function confirmEmail(data){
    return apiInstance.put('/api/v1/auth/confirmEmail', data);
}
function getUserInfo() {
    return apiInstance.get('/auth/user');
}
function getInfo() {
    return apiInstance.get('/api/v1/user/me');
}
function getAllUsers() {
    return apiInstance.get('/api/v1/user/all')
}

function deleteUser(id) {
    return apiInstance.delete(`/api/v1/user/delete?id=${id}`);
}
function editUser(user, id) {
    return apiInstance.put(`/api/v1/user/update?id=${id}`, user);
}
function editMyInfo(user){
    return apiInstance.put(`/api/v1/user/me/update`, user);
}
function editBalance(data) {
    return apiInstance.post('/api/v1/user/balance', data)
}
function storeCSV(file) {
    return apiInstance.post('/api/v1/import/usersCsv', file);
}
function getStockList() {
    return apiInstance.get('/api/v1/stock/info');
}
function getStockInfo(symbol, range = '1d', interval = '15m'){
    return apiInstance.get(`/api/v1/stock/graph?symbol=${symbol}&interval=${interval}&range=${range}`);
}
function sendResetPassword(data){
    return apiInstance.post(`/api/v1/auth/forgotPassword`, data);
}
function resetPassword(data){
    return apiInstance.post(`/api/v1/auth/resetPassword`, data);
}
function getTransactions() {
    return apiInstance.get('/api/v1/transaction/me');
}
function getUserTransactions(id) {
    return apiInstance.get(`/api/v1/transaction/?id=${id}`);
}
function getAllTransactions() {
    return apiInstance.get('/api/v1/transaction/all');
}
function invest(data){
    return apiInstance.post(`/api/v1/invest/buy`, data);
}
function getInvestments() {
    return apiInstance.get('/api/v1/invest/me');
}
function getUserInvestments(id) {
    return apiInstance.get(`/api/v1/invest/user?id=${id}`);
}
function getAllInvestments() {
    return apiInstance.get('/api/v1/invest/all');
}
function sellInvestment(id) {
    return apiInstance.post(`/api/v1/invest/sell?investmentId=${id}`);
}
function depositRequest() {
    return apiInstance.get('/api/v1/user/balanceRequest');
}
function investmentStatus(data){
    return apiInstance.post('/api/v1/invest/status', data);
}
function getPricesList(){
    return apiInstance.get('/api/v1/change');
}
function createPrice(data){
    return apiInstance.post('/api/v1/change', data);
}
function deletePrice(id){
    return apiInstance.delete(`/api/v1/change?id=${id}`);
}
const getActiveInvestments = () => {
    return apiInstance.get('/api/v1/stake/current');
}
function createStake(amount){
    return apiInstance.post('/api/v1/stake/', amount);
}
function closeStake(id, percentage, profit){
    const data = new FormData();
    data.append('stakeId', id);
    data.append('amount', profit);
    data.append('percent', percentage);
    return apiInstance.post(`/api/v1/stake/close`, data);
}
const getActiveUserInvestments = (id) => {
    return apiInstance.get(`/api/v1/stake/current/user?id=${id}`);
}
const getUserStakeInfo = (id) => {
    return apiInstance.get(`/api/v1/stakeInfo?id=${id}`);
}
const createUserInvestment = (data) => {
    return apiInstance.post('/api/v1/stakeInfo/', data);
}
const editUserInvestment = (data) => {
    return apiInstance.put('/api/v1/stakeInfo/', data);
}
const api = {
    login,
    register,
    getUserInfo,
    getAllUsers,
    deleteUser,
    editUser,
    isValidEmail,
    confirmEmail,
    editBalance,
    editMyInfo,
    storeCSV,
    getStockList,
    getStockInfo,
    sendResetPassword,
    resetPassword,
    getTransactions,
    getUserTransactions,
    getAllTransactions,
    invest,
    getInvestments,
    getUserInvestments,
    getAllInvestments,
    sellInvestment,
    depositRequest,
    investmentStatus,
    getPricesList,
    createPrice,
    deletePrice,
    getActiveInvestments,
    createStake,
    closeStake,
    getActiveUserInvestments,
    createUserInvestment,
    editUserInvestment,
    getInfo,
    getUserStakeInfo
}

export default api;