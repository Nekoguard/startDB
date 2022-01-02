import React from "react";

import './item-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spiner";

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{ label }</span>
            <span>{ item[field] }</span>
        </li>
    );
}

export { Record };

export default class ItemDetails extends React.Component {
    swapiService = new SwapiService();

    state = {
        item: null,
        image: null
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem = () => {
        const { itemId, getData, getImageUrl } = this.props;

        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    image: getImageUrl(item)
                });
            });
    };

    render() {
        const { item, image } = this.state;

        if (!item) {
            return <span>Select a person from the list</span>;
        }

        const { id, name, gender, birthYear, eyeColor } = item;

        return (
            <div className="item-details card">
                <img className="item-image"
                     src={ image }
                     onError={(e) => {e.target.onerror = null; e.target.src = "https://lh3.googleusercontent.com/proxy/1S3s8Vtcrt8qFdoZ4H2Ejct2tMkwHuwe9HZkOY-gOnxZ_OenKGVt882RvZxAUzTpcxc5VdfSAy97_aibRL0JPs1iNZMMguF0NLL4LaAxUdOo2EoT"}}
                     alt="item" />

                <div className="card-body">
                    <h4>{ name }</h4>

                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, { item });
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}