import { COLORS } from '@/lib/colors'

export const uiConfig = {
    theme: {
        token: {
            fontFamily: '\'Manrope\', sans-serif',
            colorPrimary: COLORS.colorPrimaryBase,
            colorLink: COLORS.colorPrimaryBase,

            ...COLORS,

            // Typography Title
            fontSizeHeading1: 40,
            fontSizeHeading2: 32,
            fontSizeHeading3: 24,
            fontSizeHeading4: 18,
            fontSize: 16,

            lineHeightHeading1: '48px',
            lineHeightHeading2: '40px',
            lineHeightHeading3: '32px',
            lineHeightHeading4: '26px',

            colorError: COLORS.colorRed400,
            colorErrorBg: COLORS.colorRed50,
            colorErrorText: COLORS.colorRed400,
            errorActiveShadow: 'none',
        },
        components: {
            Typography: {
                titleMarginBottom: 0,
                colorText: COLORS.colorNeutral700,
            },
            Input: {
                controlHeight: 48,
                colorTextPlaceholder: '#A6A6A6',
                inputFontSize: 14,
                // colorPrimaryHover: primaryColor,
                // colorPrimaryFocus: COLORS.colorPrimaryBase,
                // colorBorder: COLORS.colorNeutral100,
                // colorBgContainer: secondaryColor120,
                // paddingInline: 15,
                borderRadius: 8,
                colorError: COLORS.colorRed400,
                colorErrorBg: '#ff0000',
                colorErrorText: 'blue',
                errorActiveShadow: 'none',

            },
            Button: {
                controlHeight: 42,
                controlHeightSM: 36,
                controlHeightLG: 48,


                // ✅ Primary Button (Filled)
                colorPrimary: COLORS.colorPrimary400,
                colorPrimaryHover: COLORS.colorPrimaryBase,
                colorPrimaryActive: COLORS.colorPrimary600,
                colorTextLightSolid: COLORS.colorNeutral950,
                colorPrimaryBorder: COLORS.colorPrimary400,

                // ✅ Primary Button (Outlined)
                colorPrimaryBorderHover: COLORS.colorPrimaryBase,
                colorPrimaryText: COLORS.colorPrimary400,
                colorPrimaryTextHover: COLORS.colorPrimaryBase,

                // ✅ Default Button (Outlined)
                // colorDefault: COLORS.colorPrimary400,
                // defaultBg: COLORS.colorNeutral400,
                // defaultColor: 'white',
                // defaultHoverBg: 'transparent',
                // defaultBorderColor: COLORS.colorNeutral950,
                // defaultHoverColor: COLORS.colorNeutral700,
                // defaultHoverBorderColor: COLORS.colorNeutral700,
            },
            Form: {
                itemMarginBottom: 15,
            },
            Menu: {
                activeBarBorderWidth: 0,
                itemColor: COLORS.colorNeutral500,
                groupTitleFontSize: 12,
                groupTitleColor: COLORS.colorNeutral500,
                iconMarginInlineEnd: 12,
                itemSelectedBg: COLORS.colorPrimary50,
            },
            Table: {
                headerBg: '#F5F7FB',
                cellPaddingBlock: 16,
                cellPaddingInline: 16,
                headerColor: COLORS.colorNeutral500,
                headerSplitColor: 'transparent',
                headerBorderRadius: 12,
                headerBorderRadiusBottom: 12,
                borderColor: 'transparent',
                rowHoverBg: 'transparent',
            },
            Switch: {
                handleSize: 18,
                handleSizeSM: 14,
                trackHeight: 22,
                trackHeightSM: 18,
                trackMinWidth: 40,
                trackMinWidthSM: 32,
            },
            Select: {
                optionHeight: 36,
                controlHeight: 42,
                fontSize: 14,
            },
        },
    },
}
