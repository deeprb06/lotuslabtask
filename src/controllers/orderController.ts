import { createOrder, getOrderById } from '../services/order';
import { catchAsync } from '../utils/helper';
import { createdDocumentResponse, failureResponse, localize, successResponse } from '../utils/messages';

const ORDER = 'order';

export const createIceOrder = catchAsync(async (req, res) => {
    const result = await createOrder(req.body);
    if (result) return createdDocumentResponse(result, res, localize('create', ORDER));
    return failureResponse({}, res, localize('createError', ORDER));
});

export const getOrder = catchAsync(async (req, res) => {
    const orderId = Number(req.params.id);
    if (isNaN(orderId)) return failureResponse({}, res, localize('getError', ORDER));
    const result = await getOrderById(orderId);
    if (result) return successResponse(result, res, localize('get', ORDER));
    return failureResponse({}, res, localize('getError', ORDER));
});
