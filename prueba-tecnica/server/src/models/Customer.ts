import { DataTypes, Model, Sequelize } from 'sequelize';

class Customer extends Model {
    public id!: number;
    public customerId!: string;
    public firstName!: string;
    public lastName!: string;
    public company!: string;
    public city!: string;
    public country!: string;
    public phone1!: string;
    public phone2!: string;
    public email!: string;
    public subscriptionDate!: Date;
    public website!: string;
}

export default Customer;
