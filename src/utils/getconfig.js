const getconfig = () => {
    {
        headers:{
           Autorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
}
export default getconfig