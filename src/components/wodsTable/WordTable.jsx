import React from "react";
import BtnEdit from "../buttons/BtnEdit";
import BtnDel from "../buttons/BtnDel";
import "./Table.css";

const WordTable =({ words, onEdit, onDelete }) => {
    return (
        <div>
            <table className="word-table">
                <thead>
                    <tr>
                        <th>Слово</th>
                        <th>Транскрипция</th>
                        <th>Перевод</th>
                        <th>Тема</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {words.map((wordItem, index) =>(
                        <tr key={index}>
                            <td>{wordItem.english}</td>
                            <td>{wordItem.transcription}</td>
                            <td>{wordItem.russian}</td>
                            <td>{wordItem.tags}</td>
                            <td>
                                <div className="btnlist">
                                    <BtnEdit onClick={() => onEdit(index)} />
                                    <BtnDel onClick={() => onDelete(index)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WordTable;