import { getProductList } from '../services/icecream';
import { catchAsync } from '../utils/helper';
import { failureResponse, localize, successResponse } from '../utils/messages';

const ICE_FLAVOUR = 'ice cream flavour' as const;

export const iceCreamFlavoursList = catchAsync(async (req, res) => {
    const result = await getProductList();
    if (result.success) 
        return successResponse(result.data, res, localize('list', ICE_FLAVOUR));
    return failureResponse({}, res, localize('listError', ICE_FLAVOUR));
});
