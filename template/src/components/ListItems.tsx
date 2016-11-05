import * as React from 'react';
import {connect} from 'react-redux';
import * as Redux from 'redux';
import * as Actions from '../actions';
import {getListItems, IProductsModel, IAppState} from '../reducers'
import {Grid, ListGroup, ListGroupItem, Glyphicon, Button, DropdownButton, MenuItem} from 'react-bootstrap';
import './listitems.scss';

interface IPropsFromState {
    items?: { id: string, name: string, checked: boolean }[];
    products?: IProductsModel;
}
interface IPropsFromDispatch {
    dispatch: Redux.Dispatch<any>
}

export interface ListItemProps extends IPropsFromState, IPropsFromDispatch {
}

const ListItems: React.StatelessComponent<ListItemProps> = (props) => {

    const unselectedProducts = props.products.products.filter(p=>props.items.map(p=>p.id).indexOf(p.id) < 0);

    const addItem = (eventKey: any, e: React.SyntheticEvent<DropdownButton>) => {
        props.dispatch(Actions.addListItem(unselectedProducts[eventKey].id));
        console.log(eventKey,e);
    }

    return <Grid>
        <h2>Current List</h2>
        <ListGroup>
            {props.items.map((p, i) => {
                return <ListGroupItem key={i}>
                    <span className={p.checked && 'checked'} style={{ cursor: 'pointer' }} onClick= { _ => { props.dispatch(Actions.toggleListItem(p.id)) } }>{p.name}</span>
                    <Button className='badge' onClick= {_ => { props.dispatch(Actions.removeListItem(p.id)) } }>
                        <Glyphicon glyph='trash'/>
                    </Button>
                </ListGroupItem>
            }) }
        </ListGroup>
        { unselectedProducts.length > 0 &&
            <DropdownButton onSelect={addItem as any} bsSize="small" title="..select a product" id="dropdown-size-large">
                {
                    unselectedProducts.map((p, i) => <MenuItem key={i} eventKey={i}> {p.name} </MenuItem>)
                }
            </DropdownButton>
        }
    </Grid>
}

const mapStateToProps = (s: IAppState):IPropsFromState => {
    return {
        items: getListItems(s),
        products: s.products
    }
};

export default connect(mapStateToProps)(ListItems);
