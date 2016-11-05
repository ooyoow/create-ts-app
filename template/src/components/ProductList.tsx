import * as React from 'react';
import {connect} from 'react-redux';
import * as Redux from 'redux';
import * as Actions from '../actions';
import {IProductsModel, IAppState} from '../reducers';
import InputText from './pure/InputText';
import {Error} from './pure/Error';
import {Grid, ListGroup, ListGroupItem, Glyphicon, Button} from 'react-bootstrap';


interface IPropsFromState {
    products: IProductsModel
}
interface IPropsFromDispatch {
    dispatch: Redux.Dispatch<any>
}

export interface ProductListProps extends IPropsFromState, IPropsFromDispatch {

}

const ProductList: React.StatelessComponent<ProductListProps> = (props) => {
    return <Grid>
        <h2>Product Database</h2>
        <ListGroup>
            {props.products.products.map((p, i) => {
                return <ListGroupItem key={i}>
                    {p.id} - {p.name}
                    <Button className='badge' onClick= {_ => { props.dispatch(Actions.removeProduct(p.id)) } }>
                        <Glyphicon glyph='trash'/>
                    </Button>
                </ListGroupItem>
            }) }
        </ListGroup>
        <hr/>
        <InputText
            placeholder = 'enter a product name'
            onChange = {(value) => { props.dispatch(Actions.addAsyncProduct(value)) } }
            />
        <Error message={props.products.error} onDismiss = {()=>{props.dispatch(Actions.dismissError())}}/>
    </Grid>
}


const mapStateToProps = (s: IAppState): IPropsFromState => {
    return {
        products: s.products
    }
};

export default connect(mapStateToProps)(ProductList);
