import "./Missing.css";

function Missing() {
    return (
        <main className="not-found">
            <h1 className="not-found-head1">404 ERROR PAGE</h1>
            <h2 className="not-found-head2">Страница не найдена</h2>
            <p className="not-found-prg">К сожалению, эта страница не существует.</p>
            <p className="not-found-prg">Но мы постоянно развиваемся, может быть в будущем мы это исправим.</p>
            <a href="/" className="not-found-btn-link">Вернуться на главную страницу</a>
        </main>
    );
};

export default Missing;