import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';

const site='https://vue3-course-api.hexschool.io/v2/';

//data為 登入時要帶入的obj資料(由後端工程師決定帶入的資料有哪些)
//登入功能: 把data Post到後端作驗證,成功 則用"解構" 取出token 與 expired,然後進行頁面跳轉
const app=createApp({
    data(){
        return{
            user:{
                username: '',
                password: ''
            },
        }
    },
    methods:{
        login(){
            console.log(this.user);
            const url=`${site}admin/signin`;
            axios.post(url, this.user)
            .then(res => {
                //console.log(res);
                //利用"解構"的方式,取出想要的屬性值
                const { token, expired }=res.data;
                //console.log(token,expired);
                //reset the previous cookie 重新設定cookie from Ref: MDN Document.cookie
                document.cookie = `myToken=${token}; expires=${new Date(expired*1000)}`; 
                //登入成功後,轉址
                window.location='product.html';
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },
    mounted(){

    }
});
app.mount('#app');