import * as Yup from 'yup';
import { COUNT_TYPE } from '../constant/constants';
// const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*./-]).{8,}$/;
// // eslint-disable-next-line no-useless-escape
// const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; // has been disabled because we need escape characters
// const MOBILE_REG = /^[0-9]{10}$/; // Change this regex based on requirement
// const NAME_REG = /^[-a-zA-Z-()]+(\s+[-a-zA-Z-()]+)*$/;
// const WEBSITE_REG = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
// const HASHTAG = /^[a-z0-9\-&#\s]+$/i;

const schema = (t) => {
  return {
    login: Yup.object({
      email: Yup.string()
        .email('hello')
        .required(t('validation:email-required')),
      password: Yup.string().required(t('validation:password-required'))
    }),
    searchRequest: Yup.object({
      type: Yup.string(),
      category: Yup.string()
    }),
    inventoryFilter: Yup.object({
      category: Yup.string(),
      inventory: Yup.string(),
      type: Yup.string(),
      warehouse: Yup.string()
    }),
    putItem: (available, isPick = false) =>
      Yup.object().shape({
        putQuantity: isPick
          ? Yup.number('Please enter number only.')
              .integer()
              .lessThan(
                available ? available + 1 : available,
                'Pick quantity limit exceeded'
              )
              .required('Required')
          : Yup.number('Please enter number only.')
              .integer()
              .required('Required'),
        subLevel: Yup.string().required(),
        usageReason: Yup.string().required('Please enter Reason/Reference'),
        confirmation: Yup.string().required('Please select an option.'),
        variance: Yup.string().when(['confirmation'], {
          is: (confirmation) => {
            return confirmation !== COUNT_TYPE.NONE;
          },
          then: Yup.string().required('Please select an option.'),
          otherwise: Yup.string()
        }),
        varianceType: Yup.string().when(['variance', 'confirmation'], {
          is: (variance, confirmation) => {
            return (
              variance && variance !== 'OK' && confirmation !== COUNT_TYPE.NONE
            );
          },
          then: Yup.string().required('Please select an option.'),
          otherwise: Yup.string()
        }),
        comment: Yup.string().when(['varianceType', 'confirmation'], {
          is: (varianceType, confirmation) => {
            return (
              varianceType &&
              (varianceType !== '' || varianceType !== null) &&
              confirmation !== COUNT_TYPE.NONE
            );
          },
          then: Yup.string().required('Please write comment.'),
          otherwise: Yup.string()
        })
      }),
    putNewWidgetItem: Yup.object().shape({
      putQuantity: Yup.number('Please enter number only.').required('Required'),
      item_id: Yup.string().required(),
      usageReason: Yup.string().required('Please enter Reason/Reference'),
      confirmation: Yup.string().required('Please select an option.'),
      variance: Yup.string().when(['confirmation'], {
        is: (confirmation) => {
          return confirmation !== 'None';
        },
        then: Yup.string().required('Please select an option.'),
        otherwise: Yup.string()
      }),
      varianceType: Yup.string().when(['variance', 'confirmation'], {
        is: (variance, confirmation) => {
          return variance && variance !== 'OK' && confirmation !== 'None';
        },
        then: Yup.string().required('Please select an option.'),
        otherwise: Yup.string()
      }),
      comment: Yup.string().when(['varianceType', 'confirmation'], {
        is: (varianceType, confirmation) => {
          return (
            varianceType &&
            (varianceType !== '' || varianceType !== null) &&
            confirmation !== 'None'
          );
        },
        then: Yup.string().required('Please write comment.'),
        otherwise: Yup.string()
      })
    }),
    adjustItem: Yup.object().shape({
      recountedQuantity: Yup.number('Please enter number only.').required(
        'Required'
      ),
      damagedQuantity: Yup.number('Please enter number only.').required(
        'Required'
      ),
      removedDamagedQuantity: Yup.boolean().required('Please select an option.')
    }),
    reportItem: Yup.object().shape({
      reportingFor: Yup.string().required('Please select an option.'),
      details: Yup.string().required('Please enter your details here.')
    }),
    reverseItem: Yup.object().shape({
      reserveQuantity: Yup.number('Please enter number only.').required(
        'Required'
      ),
      job: Yup.string().required('Please enter Job details here.'),
      pickupDate: Yup.string().required('Please select date.'),
      usageReason: Yup.string().required('Please enter your details here.'),
      warehouseId: Yup.string().required('Please select warehouse.')
    }),
    checkInItem: Yup.object().shape({
      subLevel: Yup.string().required('Please scan location here.'),
      hasIssue: Yup.boolean().required('Please select an option.'),
      checkInMeterReading: Yup.number('Please enter number only.').required(
        'Please enter Check-In meter reading.'
      ),
      issueDescription: Yup.string().when(['hasIssue'], {
        is: (hasIssue) => {
          return hasIssue === true;
        },
        then: Yup.string().required('Please enter issue details here.'),
        otherwise: Yup.string()
      })
    }),
    checkOutItem: Yup.object().shape({
      subLevel: Yup.string().required('Please scan location here.'),
      hasIssue: Yup.string().required('Please select an option.'),
      checkOutMeterReading: Yup.number('Please enter number only.').required(
        'Please enter Check-Out meter reading.'
      ),
      job: Yup.string().required('Please enter Job details here.'),
      usageReason: Yup.string().when(['hasIssue'], {
        is: (hasIssue) => {
          return hasIssue !== '';
        },
        then: Yup.string().required('Please enter issue details here.'),
        otherwise: Yup.string()
      })
    })
  };
};

export default schema;
