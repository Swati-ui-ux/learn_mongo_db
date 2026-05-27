const User = require('../user');
const { getDb } = require('../../config/db_connection');
jest.mock("../../config/db_connection");

describe('User.findByEmail() findByEmail method', () => {
    let mockCollection;
    let mockDb;

    beforeEach(() => {
        jest.clearAllMocks();

        mockCollection = {
            findOne: jest.fn(),
        };
        mockDb = {
            collection: jest.fn().mockReturnValue(mockCollection),
        };
        getDb.mockReturnValue(mockDb);
    });


    test('should return the user document when a user with the given email exists', async () => {
        const email = 'test@example.com';
        const expectedUser = { _id: 'someid', name: 'Test', email: 'test@example.com' };
        mockCollection.findOne.mockResolvedValue(expectedUser);

        const result = await User.findByEmail(email);

        expect(getDb).toHaveBeenCalledTimes(1);
        expect(mockDb.collection).toHaveBeenCalledWith('User');
        expect(mockCollection.findOne).toHaveBeenCalledWith({ email });
        expect(result).toBe(expectedUser);
    });

    test('should return null when no user with the given email exists', async () => {
        const email = 'notfound@example.com';
        mockCollection.findOne.mockResolvedValue(null);

        const result = await User.findByEmail(email);

        expect(getDb).toHaveBeenCalledTimes(1);
        expect(mockDb.collection).toHaveBeenCalledWith('User');
        expect(mockCollection.findOne).toHaveBeenCalledWith({ email });
        expect(result).toBeNull();
    });

    test('should work with emails containing special characters', async () => {
        const email = 'user+test@domain.co.uk';
        const expectedUser = { _id: 'id2', name: 'Special', email };
        mockCollection.findOne.mockResolvedValue(expectedUser);

        const result = await User.findByEmail(email);

        expect(mockCollection.findOne).toHaveBeenCalledWith({ email });
        expect(result).toBe(expectedUser);
    });


    test('should return null when email is an empty string', async () => {
        const email = '';
        mockCollection.findOne.mockResolvedValue(null);

        const result = await User.findByEmail(email);

        expect(mockCollection.findOne).toHaveBeenCalledWith({ email });
        expect(result).toBeNull();
    });

    test('should return null when email is undefined', async () => {
        const email = undefined;
        mockCollection.findOne.mockResolvedValue(null);

        const result = await User.findByEmail(email);

        expect(mockCollection.findOne).toHaveBeenCalledWith({ email });
        expect(result).toBeNull();
    });

    test('should return null when email is null', async () => {
        const email = null;
        mockCollection.findOne.mockResolvedValue(null);

        const result = await User.findByEmail(email);

        expect(mockCollection.findOne).toHaveBeenCalledWith({ email });
        expect(result).toBeNull();
    });

    test('should propagate errors thrown by the database', async () => {
        const email = 'error@example.com';
        const dbError = new Error('Database failure');
        mockCollection.findOne.mockRejectedValue(dbError);

        await expect(User.findByEmail(email)).rejects.toThrow('Database failure');
        expect(mockCollection.findOne).toHaveBeenCalledWith({ email });
    });

    test('should handle emails with leading/trailing whitespace', async () => {
        const email = '  spaced@example.com  ';
        mockCollection.findOne.mockResolvedValue(null);

        await User.findByEmail(email);

        expect(mockCollection.findOne).toHaveBeenCalledWith({ email });
    });

    test('should handle numeric email values (not recommended, but possible)', async () => {
        const email = 12345;
        mockCollection.findOne.mockResolvedValue(null);

        await User.findByEmail(email);

        expect(mockCollection.findOne).toHaveBeenCalledWith({ email });
    });

    test('should handle object as email (not recommended, but possible)', async () => {
        const email = { address: 'object@example.com' };
        mockCollection.findOne.mockResolvedValue(null);

        await User.findByEmail(email);

        expect(mockCollection.findOne).toHaveBeenCalledWith({ email });
    });
});