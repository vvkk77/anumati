import dayjs from 'dayjs';

export const formatDate = (date) => {
    return dayjs(new Date(date)).format('DD/MM/YYYY | hh:mm A');
};
