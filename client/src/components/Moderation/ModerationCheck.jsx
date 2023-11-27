import {getReportFromGalleryID} from '../../Utils/requests';
// also import other functions used
export const HiddenStatus = {
    Displayed: 0,
    LocallyHidden: 1,
    GloballyHidden: 2
}
export default function ModerationCheck({galleryID, userID}){
    
    const report = getReportFromGalleryID(galleryID);

    if(report != null) {
        // update with proper function name
        if (report.globally_hidden == 1)
        {
            return HiddenStatus.GloballyHidden;
        }
        // update with proper function name
        for (reporter in report.reporters.reporters) {
            if (userID == reporter) {
                return HiddenStatus.LocallyHidden;
            }
        }
    }
    return HiddenStatus.Displayed;
}