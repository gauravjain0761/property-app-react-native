import React, { useContext } from 'react'
import { Platform } from 'react-native'
import { useTheme, useTranslations } from '../core/dopebase'

const regexForNames = /^[a-zA-Z]{2,25}$/
const regexForPhoneNumber = /\d{9}$/

export const ConfigContext = React.createContext({})

export const ConfigProvider = ({ children }) => {
  const { theme } = useTheme()
  const { localized } = useTranslations()
  const config = {
    isSMSAuthEnabled: true,
    isGoogleAuthEnabled: true,
    isAppleAuthEnabled: true,
    isFacebookAuthEnabled: true,
    forgotPasswordEnabled: true,
    isDelayedLoginEnabled: false,
    appIdentifier: `io.instamobile.rnrealestate`,
    facebookIdentifier: '1288726485109267',
    webClientId: Platform.select({
      ios: '22965687108-k9uqgstoahao7bndat1lgbhmlektp2jb.apps.googleusercontent.com',
      default:
        '77052254171-rskhn3sf5sban5s8kpbjsbgggdl5n2r2.apps.googleusercontent.com',
    }),
    adMobConfig: {
      adBannerSize: 'banner', // "largeBanner" | "mediumRectangle" || "fullBanner" || "leaderboard" || "smartBannerPortrait" || "smartBannerLandscape"
      adUnitID: 'ca-app-pub-5357234145673650/6960322184',
    },
    isApprovalProcessEnabled: false,
    serverConfig: {
      collections: {
        listings: 'real_estate_listings',
        savedListings: 'real_estate_saved_listings',
        categories: 'real_estate_categories',
        filters: 'real_estate_filters',
        reviews: 'real_estate_reviews',
        subrealestate: 'sub_real_estate',
      },
      categories: {
        Real_estate: 'REMoOVjJ7MyghANZwqFQGH',
        Land: 'aeqGqN6dPVzeZqwt1kIAK7',
        Town_house: 'aaPdF5Dskd3DrHMWV3SwLs',
        Apartments: 'ab0m6eozTA2SCZ6BrqF2La',
        Commercial: 'af7UgYdE4l7Kr3dJjElAXi',
        Villa: 'agwFb3cn4fpoqUmGmib5fA',
      },
      currency: {
        USD: '$',
        IDR: 'Rp',
        INR: '₹',
        EUR: '€',
        GBP: '£',
      },
    },
    onboardingConfig: {
      welcomeTitle: localized('Welcome to Instahome'),
      welcomeCaption: localized(
        'Use our app to find or sell the perfect home instantly.',
      ),
      walkthroughScreens: [
        {
          icon: require('../assets/icons/logo.png'),
          title: localized('Find your perfect home'),
          description: localized('Find the perfect house in minutes.'),
        },
        {
          icon: require('../assets/icons/map.png'),
          title: localized('Map View'),
          description: localized(
            'Visualize houses on the map to make your search easier.',
          ),
        },
        {
          icon: require('../assets/icons/heart.png'),
          title: localized('Saved Places'),
          description: localized(
            'Save your favorite places to come back to them later.',
          ),
        },
        {
          icon: require('../assets/icons/filters.png'),
          title: localized('Advanced Custom Filters'),
          description: localized(
            'Custom dynamic filters to accommodate all markets and all customer needs.',
          ),
        },
        {
          icon: require('../assets/icons/instagram.png'),
          title: localized('Add New Listings'),
          description: localized(
            'Add new houses and condos directly from the app, including photo gallery and filters.',
          ),
        },
        {
          icon: require('../assets/icons/chat.png'),
          title: localized('Chat'),
          description: localized(
            'Communicate with customers and real estate agents in real-time.',
          ),
        },
        {
          icon: require('../assets/icons/notification.png'),
          title: localized('Get Notified'),
          description: localized(
            'Stay on top of your game with real-time push notifications.',
          ),
        },
      ],
    },

    tabIcons: {
      Home: {
        focus: theme.icons.homefilled,
        unFocus: theme.icons.homeUnfilled,
      },
      Categories: {
        focus: theme.icons.collections,
        unFocus: theme.icons.collections,
      },
      Messages: {
        focus: theme.icons.commentFilled,
        unFocus: theme.icons.commentUnfilled,
      },
      Search: {
        focus: theme.icons.search,
        unFocus: theme.icons.search,
      },
    },
    reverseGeoCodingAPIKey: 'AIzaSyAEvaTaqsXyI5ozkcPTB9KY0Y-DNEwoHsc',
    tosLink: 'https://www.instamobile.io/eula-instachatty/',
    isUsernameFieldEnabled: false,
    smsSignupFields: [
      {
        displayName: localized('First Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: localized('Last Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
    ],
    signupFields: [
      {
        displayName: localized('First Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: localized('Last Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
      {
        displayName: localized('E-mail Address'),
        type: 'email-address',
        editable: true,
        regex: regexForNames,
        key: 'email',
        placeholder: 'E-mail Address',
        autoCapitalize: 'none',
      },
      {
        displayName: localized('Password'),
        type: 'default',
        secureTextEntry: true,
        editable: true,
        regex: regexForNames,
        key: 'password',
        placeholder: 'Password',
        autoCapitalize: 'none',
      },
    ],
    editProfileFields: {
      sections: [
        {
          title: localized('PUBLIC PROFILE'),
          fields: [
            {
              displayName: localized('First Name'),
              type: 'text',
              editable: true,
              regex: regexForNames,
              key: 'firstName',
              placeholder: 'Your first name',
            },
            {
              displayName: localized('Last Name'),
              type: 'text',
              editable: true,
              regex: regexForNames,
              key: 'lastName',
              placeholder: 'Your last name',
            },
          ],
        },
        {
          title: localized('PRIVATE DETAILS'),
          fields: [
            {
              displayName: localized('E-mail Address'),
              type: 'text',
              editable: true,
              key: 'email',
              placeholder: 'Your email address',
            },
            {
              displayName: localized('Phone Number'),
              type: 'text',
              editable: true,
              regex: regexForPhoneNumber,
              key: 'phone',
              placeholder: 'Your phone number',
            },
          ],
        },
      ],
    },
    userSettingsFields: {
      sections: [
        {
          title: localized('GENERAL'),
          fields: [
            {
              displayName: localized('Allow Push Notifications'),
              type: 'switch',
              editable: true,
              key: 'push_notifications_enabled',
              value: true,
            },
            {
              ...(Platform.OS === 'ios'
                ? {
                    displayName: localized('Enable Face ID / Touch ID'),
                    type: 'switch',
                    editable: true,
                    key: 'face_id_enabled',
                    value: false,
                  }
                : {}),
            },
          ],
        },
        {
          title: '',
          fields: [
            {
              displayName: localized('Save'),
              type: 'button',
              key: 'savebutton',
            },
          ],
        },
      ],
    },
    contactUsFields: {
      sections: [
        {
          title: localized('CONTACT'),
          fields: [
            {
              displayName: localized('Address'),
              type: 'text',
              editable: false,
              key: 'contacus',
              value: '142 Steiner Street, San Francisco, CA, 94115',
            },
            {
              displayName: localized('E-mail us'),
              value: 'florian@instamobile.io',
              type: 'text',
              editable: false,
              key: 'email',
              placeholder: 'Your email address',
            },
          ],
        },
        {
          title: '',
          fields: [
            {
              displayName: localized('Call Us'),
              type: 'button',
              key: 'savebutton',
            },
          ],
        },
      ],
    },
    contactUsPhoneNumber: '+16504859694',
    homeConfig: {
      mainCategoryID: 'aaPdF5Dskd3DrHMWV3SwLs',
      mainCategoryName: 'Houses',
    },
    bookingConfig: {
      buttonLabel: localized('Reserve'),
      type: 'airbnb',
    },
    currencyData: [
      {
        label: 'USD $',
        value: '$',
      },
      {
        label: 'IDR Rp',
        value: 'Rp',
      },
      {
        label: 'INR ₹',
        value: '₹',
      },
      {
        label: 'EUR €',
        value: '€',
      },
      {
        label: 'GBP £',
        value: '£',
      },
    ],
    mapDark: [
      {
        elementType: 'geometry',
        stylers: [
          {
            color: '#242f3e',
          },
        ],
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#746855',
          },
        ],
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#242f3e',
          },
        ],
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#d59563',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#d59563',
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
          {
            color: '#263c3f',
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#6b9a76',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          {
            color: '#38414e',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#212a37',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9ca5b3',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
          {
            color: '#746855',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#1f2835',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#f3d19c',
          },
        ],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
          {
            color: '#2f3948',
          },
        ],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#d59563',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#17263c',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#515c6d',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#17263c',
          },
        ],
      },
    ],
  }

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  )
}

export const useConfig = () => useContext(ConfigContext)
