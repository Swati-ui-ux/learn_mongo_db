const Product = require('../product');
const { getDb } = require('../../config/db_connection');
const { ObjectId } = require('mongodb');
jest.mock("../../config/db_connection");
jest.mock('mongodb', () => {
  const actual = jest.requireActual('mongodb');
  return {
    ...actual,
    ObjectId: jest.fn(),
  };
});

describe('Product.deleteById() deleteById method', () => {
  let mockDb;
  let mockCollection;
  let mockDeleteOne;

  beforeEach(() => {
    jest.clearAllMocks();

    mockDeleteOne = jest.fn();

    mockCollection = jest.fn(() => ({
      deleteOne: mockDeleteOne,
    }));

    mockDb = {
      collection: mockCollection,
    };

    getDb.mockReturnValue(mockDb);
  });


  test('should delete a product by valid id (happy path)', async () => {
    const validId = '60c72b2f9b1e8b6f1f8e4d3c';
    const fakeObjectId = { _id: 'fake-object-id' };
    ObjectId.mockImplementationOnce((id) => {
      expect(id).toBe(validId);
      return fakeObjectId;
    });

    const deleteResult = { deletedCount: 1 };
    mockDeleteOne.mockResolvedValueOnce(deleteResult);

    const result = await Product.deleteById(validId);

    expect(getDb).toHaveBeenCalled();
    expect(mockCollection).toHaveBeenCalledWith('products');
    expect(mockDeleteOne).toHaveBeenCalledWith({ _id: fakeObjectId });
    expect(result).toBe(deleteResult);
  });

  test('should return the result of deleteOne (happy path)', async () => {
    const validId = '507f1f77bcf86cd799439011';
    const fakeObjectId = { _id: 'another-fake-object-id' };
    ObjectId.mockReturnValueOnce(fakeObjectId);

    const deleteResult = { acknowledged: true, deletedCount: 1 };
    mockDeleteOne.mockResolvedValueOnce(deleteResult);

    const result = await Product.deleteById(validId);

    expect(result).toBe(deleteResult);
  });


  test('should throw if ObjectId throws (invalid id)', async () => {
    const invalidId = 'not-a-valid-objectid';
    const error = new Error('Invalid ObjectId');
    ObjectId.mockImplementationOnce(() => { throw error; });

    await expect(Product.deleteById(invalidId)).rejects.toThrow(error);

    expect(getDb).toHaveBeenCalled();
    expect(mockCollection).not.toHaveBeenCalled();
    expect(mockDeleteOne).not.toHaveBeenCalled();
  });

  test('should propagate errors from deleteOne', async () => {
    const validId = '507f1f77bcf86cd799439011';
    const fakeObjectId = { _id: 'yet-another-fake-object-id' };
    ObjectId.mockReturnValueOnce(fakeObjectId);

    const error = new Error('deleteOne failed');
    mockDeleteOne.mockRejectedValueOnce(error);

    await expect(Product.deleteById(validId)).rejects.toThrow(error);

    expect(getDb).toHaveBeenCalled();
    expect(mockCollection).toHaveBeenCalledWith('products');
    expect(mockDeleteOne).toHaveBeenCalledWith({ _id: fakeObjectId });
  });

  test('should handle null/undefined id gracefully', async () => {
    ObjectId.mockImplementationOnce(() => { throw new Error('Invalid ObjectId'); });

    await expect(Product.deleteById(null)).rejects.toThrow('Invalid ObjectId');
    await expect(Product.deleteById(undefined)).rejects.toThrow('Invalid ObjectId');
  });

  test('should handle empty string id gracefully', async () => {
    ObjectId.mockImplementationOnce(() => { throw new Error('Invalid ObjectId'); });

    await expect(Product.deleteById('')).rejects.toThrow('Invalid ObjectId');
  });

  test('should call deleteOne with correct filter object', async () => {
    const validId = '507f1f77bcf86cd799439011';
    const fakeObjectId = { _id: 'filter-fake-object-id' };
    ObjectId.mockReturnValueOnce(fakeObjectId);

    mockDeleteOne.mockResolvedValueOnce({ acknowledged: true, deletedCount: 1 });

    await Product.deleteById(validId);

    expect(mockDeleteOne).toHaveBeenCalledWith({ _id: fakeObjectId });
  });

  test('should not call deleteOne if getDb throws', async () => {
    getDb.mockImplementationOnce(() => { throw new Error('DB connection failed'); });

    await expect(Product.deleteById('507f1f77bcf86cd799439011')).rejects.toThrow('DB connection failed');
    expect(mockCollection).not.toHaveBeenCalled();
    expect(mockDeleteOne).not.toHaveBeenCalled();
  });

});