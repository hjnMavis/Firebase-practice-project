import { useLogin } from '../../hooks/useLogin';
import styles from './Login.module.css'
import { useState } from 'react';

export default function Login() {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, isPending, login } = useLogin();
  
    const handleData = (event) => {
        if(event.target.type === 'email') {
            setEmail(event.target.value);
        } else if(event.target.type === 'password') {
            setPassword(event.target.value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        login(email, password);
    }

    return (
        <form className={styles.login_form} onSubmit={handleSubmit}>
            <fieldset>
                <legend>🔐 로그인</legend>
                <label htmlFor="myEmail">📧 이메일</label>
                <input type="email" id="myEmail" required value={email} onChange={handleData} placeholder="이메일을 입력해주세요" />
            
                <label htmlFor="myPassword">🔒 비밀번호</label>
                <input type="password" id="myPassword" required value={password} onChange={handleData} placeholder="비밀번호를 입력해주세요"/>
            
                {!isPending && <button type="submit" className={styles.btn}>✨ 로그인하기</button>}
                {isPending && <strong>로그인 진행중입니다... 💫</strong>}
                {error && <strong>{error}</strong>}
                
            </fieldset>
        </form>
  )
}