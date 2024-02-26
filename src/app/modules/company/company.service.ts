import { CompanyModel } from './company.model';

//this function will be used to get company suggestions from database based on cin or company name
const getCompanySuggestionsFromDB = async (searchTerm: string) => {
  // Define a regex pattern to check if the search term is a valid CIN
  const cinPattern = /^(?:[A-Z]{1}[0-9A-Z]{20}|[A-Z]{3}-\d{1,4})$/;
  const isCINSearch = cinPattern.test(searchTerm);

  let companySuggestionsPipeline;

  if (isCINSearch) {
    companySuggestionsPipeline = [
      {
        $match: { 'masterData.companyData.CIN': searchTerm },
      },
      {
        $project: {
          cin: '$masterData.companyData.CIN',
          company: '$masterData.companyData.company',
        },
      },
    ];
  } else {
    // Fuzzy search for company name
    companySuggestionsPipeline = [
      {
        $search: {
          index: 'default', // name for search index
          text: {
            query: searchTerm,
            path: 'masterData.companyData.company',
            fuzzy: { maxEdits: 1 },
          },
          highlight: { path: 'masterData.companyData.company' },
        },
      },
      {
        $project: {
          cin: '$masterData.companyData.CIN',
          company: '$masterData.companyData.company',
          score: { $meta: 'searchScore' },
          highlight: { $meta: 'searchHighlights' },
        },
      },
      { $limit: 10 },
    ];
  }

  const result = await CompanyModel.aggregate(companySuggestionsPipeline);
  return result;
};

export const CompanyServices = {
  getCompanySuggestionsFromDB,
};
