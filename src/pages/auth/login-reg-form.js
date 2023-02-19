import axios from "axios";
import { router, useEffect, useState } from "../../../lib";
import JustValidate from "just-validate";
import Cookies from "js-cookie";
import header from "../../components/header";
import footer from "../../components/footer";

const loginRegForm = ({redirectUrl}) => {
    const form = {
        "login" : {
            type: "login",
            name: "Đăng nhập",
            field: [
                {
                    type: "text",
                    label: "Tên tài khoản",
                    name: "username",
                    validator: [
                        {
                            rule: 'required',
                            errorMessage: 'Vui lòng nhập trường này'
                        }
                    ]
                },
                {
                    type: "password",
                    label: "Mật khẩu",
                    name: "password",
                    validator: [
                        {
                            rule: 'required',
                            errorMessage: 'Vui lòng nhập trường này'
                        }
                    ]
                }
            ]
        },
        "register" : {
            type: "register",
            name: "Đăng ký",
            field: [
                {
                    type: "text",
                    label: "Tên tài khoản",
                    name: "username",
                    validator: [
                        {
                            rule: 'required',
                            errorMessage: 'Vui lòng nhập trường này'
                        }
                    ]
                },
                {
                    type: "password",
                    label: "Mật khẩu",
                    name: "password",
                    validator: [
                        {
                            rule: 'required',
                            errorMessage: 'Vui lòng nhập trường này'
                        }
                    ]
                },
                {
                    type: "password",
                    label: "Nhập lại mật khẩu",
                    name: "password-check",
                    validator: [
                        {
                            rule: 'required',
                            errorMessage: 'Vui lòng nhập trường này'
                        },
                        {
                            validator: (value) => {
                                const password = document.querySelector('input[name="password"]').value;
                                if(password !== value){
                                    return false;
                                }

                                return true;
                            },
                            errorMessage: 'Mật khẩu không khớp'
                        }
                    ]
                }
            ]
        }
    }

    const [currentForm, setForm] = useState(form.login);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        document.querySelector('p[data-button]') && document.querySelector('p[data-button]').addEventListener('click', (e) => {
            const { button } = e.target.dataset;
            setForm(form[button]);
        })

        const validator = new JustValidate('main form')
        
        document.querySelectorAll('main input').forEach((input) => {
            const inputProps = currentForm.field.filter((field) => field.name === input.getAttribute('name'))[0];
            
            if(inputProps){
                inputProps.validator && inputProps.validator.length > 0 && validator.addField(input, inputProps.validator);
            }
        })

        validator.onSuccess(async({target}) => {
            const form = new FormData(target);
            const formData = Object.fromEntries(form.entries());
            
            switch (currentForm.type) {
                case 'login':
                    try {
                        const res = await axios.get(`http://localhost:3000/users/${formData.username}`);
                        if(res.data.password !== formData.password){
                            setMsg('Sai tên tài khoản hoặc mật khẩu');
                        }else{
                            Cookies.set('user', JSON.stringify(res.data), { expires: Boolean(formData.remember) ? 365 : 1 });
                            redirectUrl ? router.navigate(redirectUrl) : router.navigate('');
                        }
                    } catch (error) {
                        setMsg('Sai tên tài khoản hoặc mật khẩu');
                    }
                    break;
                case 'register':
                    try {
                        const res = await axios.get(`http://localhost:3000/users/${formData.username}`);
                        setMsg('Tài khoản đã tồn tại');
                    } catch (error) {
                        const userData = { id: formData.username, password: formData.password, role: 'user' }
                        const res = await axios.post('http://localhost:3000/users', userData);
                        Cookies.set('user', JSON.stringify(res.data), { expires: Boolean(formData.remember) ? 365 : 1 });
                        redirectUrl ? router.navigate(redirectUrl) : router.navigate('');
                    }
                default:
                    break;
            }
        })
    })

    return /*html*/ `
        ${header()}
        <main class='max-w-screen-xl mx-auto py-4'>
            <h1 class="text-3xl mx-auto w-fit text-black-primary font-bold mt-4">${currentForm.name}</h1>
            <form class="max-w-lg mx-auto py-9">
                ${
                    currentForm.field.map((field) => {
                        return /*html*/ `
                            <div class="mb-6">
                                <input type="${field.type}" name="${field.name}" class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="${field.label}"
                                />
                            </div>
                        `;
                    }).join("")
                }
                <div class="flex justify-between items-center mb-6">
                    <label class="form-group form-check cursor-pointer">
                        <input name='remember' type="checkbox" class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2" id="exampleCheck3" checked/>
                        <p class="form-check-label inline-block text-gray-800" for="exampleCheck2">Remember me</p>
                    </label>
                    ${
                        currentForm.type !== "login" ? 
                        /*html*/ `<p data-button="login" class="text-blue-600 cursor-pointer hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out">Đã có tài khoản? Đăng nhập ngay</p> `
                        :
                        /*html*/ `<p data-button="register" class="text-blue-600 cursor-pointer hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out">Chưa có tài khoản? Đăng ký ngay</p> `
                    }
                </div>
                ${msg ? /*html*/ `<p class="text-red-600 text-sm mb-4">${msg}</p>` : ''}
                <button type="submit" class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full">
                    ${currentForm.name}
                </button>
            </form>
        </main>
        ${footer}
    `;
}

export default loginRegForm