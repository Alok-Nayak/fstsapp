import { CompanyServices } from './company.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';

const getCompanySuggestions = catchAsync(async (req, res) => {
  let searchTerm = req.query.searchTerm;

  // Validate the search term is a string and not empty
  if (typeof searchTerm !== 'string' || !searchTerm.trim()) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Valid search term is required.');
  }

  //standardize the search term
  searchTerm = searchTerm.trim().toUpperCase();

  const result = await CompanyServices.getCompanySuggestionsFromDB(searchTerm);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Company suggestions fetched successfully.',
    data: result,
  });
});

export const CompanyControllers = {
  getCompanySuggestions,
};
