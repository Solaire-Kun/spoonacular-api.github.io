import React from "react";
import '../css/ItemsList.css';

const ItemsList = (props) => {
    const items = props.items;

    return (
        <>
        {items.length !== 0 && (
            <>
            <h1 className="d-flex justify-content-center">Results</h1>
                <div className="container-fluid row row-cols-md-5">
                    {items && items.map((item) => (
                        <div key={ item.id } className="col">
                            <img className="d-flex rounded mx-auto mt-2 img-thumbnail bg-dark" src={ item.image } alt="" />
                            <div className="d-flex flex-column text-center justify-content-center">
                                <h3 className="pt-1">{ item.title }</h3>
                                <a href={ `https://spoonacular.com/recipes/${ item.title }-${ item.id }` }
                                className="btn btn-primary d-flex mb-2 text-center justify-content-center align-self-center">Details</a>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )}
        </>
    );
}

export default ItemsList;