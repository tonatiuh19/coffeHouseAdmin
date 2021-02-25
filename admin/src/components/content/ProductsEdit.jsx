import React, {useState} from 'react'
import { Form, Modal, Button } from 'react-bootstrap';

const ProductsEdit = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [titleEdit, setTitleEdit] = useState('');

    const handleCloseEdit = () => setShowEdit(true);

    const handleShowEdit = (item) => {
        setShowEdit(true);
        setTitleEdit('#'+item.id_products+' '+'-'+' '+decode_utf8(item.name));
    };

    function decode_utf8(s) {
        return decodeURIComponent(escape(s));
    }

    return (
        <Modal
            show={showEdit}
            size="lg"
            onHide={handleCloseEdit}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                        <Modal.Title>{titleEdit}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Example select</Form.Label>
                        <Form.Control as="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>Example multiple select</Form.Label>
                        <Form.Control as="select" multiple>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>
                    Cancelar
                </Button>
                <Button variant="success">Guardar cambios</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ProductsEdit
