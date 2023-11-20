import {getReport} from '../../Utils/requests';

export default function ModerationCheck({contentID, userID}){
    const HiddenStatus = {
        Displayed: 0,
        LocallyHidden: 1,
        GloballyHidden: 2
    }

    const report = getReport(contentID);
    if(report != null) {
        if (report.getGloballyHidden())
        {
            return HiddenStatus.GloballyHidden;
        }
        for (reporter in report.getReporters()) {
            if (userID == reporter) {
                return HiddenStatus.LocallyHidden;
            }
        }
    } else {
        return HiddenStatus.Displayed;
    }
}