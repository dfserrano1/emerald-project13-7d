import {getReport} from '../../Utils/requests';
// also import other functions used
export const HiddenStatus = {
    Displayed: 0,
    LocallyHidden: 1,
    GloballyHidden: 2
}
export default function ModerationCheck({contentID, userID}){
    
    const report = getReport(contentID);

    if(report != null) {
        // update with proper function name
        if (report.getGloballyHidden())
        {
            return HiddenStatus.GloballyHidden;
        }
        // update with proper function name
        for (reporter in report.getReporters()) {
            if (userID == reporter) {
                return HiddenStatus.LocallyHidden;
            }
        }
    }
    return HiddenStatus.Displayed;
}