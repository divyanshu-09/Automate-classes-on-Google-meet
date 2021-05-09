
const classes = [ {

    subject: 'Maths',
    hours: 11,
    minutes: 55,
    link: 'https://meet.google.com/ejf-nwrz-car',
    roll_no: '1851106',

}, {

    subject: 'Network',
    hours: 11,
    minutes: 57,
    link: 'https://meet.google.com/aux-rmda-ybc',
    roll_no: '1851106',

}, {

    subject: 'Soft. Engg.',
    hours: 11,
    minutes: 59,
    link: 'https://meet.google.com/qqy-qndv-nft',
    roll_no: '1851106',

}, {

    subject: 'Econ.',
    hours: 23,
    minutes: 05,
    link: 'avasd',

} ];

const no_of_classes = 4;

const findclass =  (index) => {

    return classes[index];
}

const findUser = () => {

    return user;
};

const user = {

    Id: 'yourmail@gmail.com',
    pass: 'password',
    roll_no: "Roll_no"
}

module.exports.findclass = findclass;
module.exports.findUser = findUser;
module.exports.no_of_classes = no_of_classes;