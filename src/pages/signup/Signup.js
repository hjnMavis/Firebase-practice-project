import { useSignup } from '../../hooks/useSignup';
import styles from './Signup.module.css'
import { useState } from 'react';

export default function Signup() {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const { error, isPending, signup } = useSignup();
  
    const handleData = (event) => {
        if(event.target.type === 'email') {
            setEmail(event.target.value);
        } else if(event.target.type === 'password') {
            setPassword(event.target.value);
        } else if(event.target.type === 'text') {
            setDisplayName(event.target.value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        signup(email, password, displayName);
    }

    return (
        <form className={styles.signup_form} onSubmit={handleSubmit}>
            <fieldset>
                <legend>🌟 회원가입</legend>
                <label htmlFor="myEmail">📧 이메일</label>
                <input type="email" id="myEmail" required value={email} onChange={handleData} placeholder="사용할 이메일을 입력해주세요" />
            
                <label htmlFor="myPassword">🔒 비밀번호</label>
                <input type="password" id="myPassword" required value={password} onChange={handleData} placeholder="안전한 비밀번호를 입력해주세요"/>
            
                <label htmlFor="myDisplayName">👤 닉네임</label>
                <input type="text" id="myDisplayName" required value={displayName} onChange={handleData} placeholder="사용할 닉네임을 입력해주세요"/>
            
                {!isPending && <button type="submit" className={styles.btn}>✨ 가입하기</button>}
                {isPending && <strong>회원가입 진행중입니다... 💫</strong>}
                {error && <strong>{error}</strong>}
                
            </fieldset>
        </form>
  )
}
