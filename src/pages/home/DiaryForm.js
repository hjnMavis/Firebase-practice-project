import { useState } from "react"
import { useFirestore } from "../../hooks/useFirestore";
import { useEffect } from "react";

export default function DiaryForm({uid}) {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const { addDocument, response } = useFirestore("diary");

    const handleData = (event) => {
        if (event.target.id === 'tit') {
            setTitle(event.target.value);
        } else if (event.target.id === "txt") {
            setText(event.target.value);
        }
    }

    useEffect(() => {
        if (response.success) {
            console.log(response);
            setTitle('');
            setText('');
        }
    }, [response.success]); // response.success가 바뀔 때만 effect를 재실행합니다.

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(title, text);

        addDocument({ uid,title, text });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>✨ 오늘의 일기 ✨</legend>
                    <label htmlFor="tit">📝 일기 제목</label>
                    <input id="tit" type='text'value={title} required onChange={handleData} placeholder="오늘은 어떤 하루였나요?" />

                    <label htmlFor="txt">💭 일기 내용</label>
                    <textarea id="txt" type='text' value={text} required onChange={handleData} placeholder="오늘 있었던 일들을 자유롭게 적어보세요..."></textarea>

                    <button type="submit">💾 일기 저장하기</button>
                </fieldset>
            </form>
        </>
    )
}