import {
    Box,
    Text,
    VStack,
} from "@chakra-ui/react";

export default function Network() {
    return (
        <Box className="network">    
            <div className="network-1">
              <div className="module-title">
                <Text
                  bgGradient='linear(to-r, #619BEB, #FFFFFF)'
                  bgClip='text'
                  // fontSize='6xl'
                  fontWeight='extrabold'
                >
                  3Dizer Network
                </Text>
              </div>
              <div className="network-desc">
                Renting out your GPU has nerver been easier 
                <br />
                - just plug in and get ready to earn!
              </div>
            </div>


            <div className="network-2">
              <div className="numerical">
                <div className="supplier">221315</div>
                <div className="speed">
                  <div className="numerical-subtitle">Connection Speed</div>
                  <div className="speed-1">104.72 MB/s</div>
                  <div className="speed-2"><span>82.47</span><span>58.25</span></div>
                  <div className="speed-3"><span>Download MB/s</span><span>Upload MB/s</span></div>
                </div>
                <div className="rewards">
                  <div className="numerical-subtitle">Collect your Earnings Now</div>
                  <div className="rewards-content"><span>$1,200</span><span>Claim</span></div>
                </div>
              </div>
              <div className="network-desc">
                3Dizer Network provides users with clear, up-to-date information about
                <br />
                various aspects of their operations or services.
              </div>
            </div>


            <div className="network-3">
              <div className="europe">
                <div className="europe-1"><span>Europe</span><span>Asia</span></div>
                <div className="europe-2"><span>21,592</span><span>6,364</span></div>
                <div className="europe-3"><span>Download MB/s</span><span>Download MB/s</span></div>
              </div>
              <div className="usa">
                <div className="usa-1"><span>North America</span><span>South America</span></div>
                <div className="usa-2"><span>9,055</span><span>211</span></div>
                <div className="usa-3"><span>Download MB/s</span><span>Download MB/s</span></div>
              </div>
              <div className="others">
                <div className="others-1"><span>Others</span><span></span></div>
                <div className="others-2"><span>1,422</span><span></span></div>
                <div className="others-3"><span>Download MB/s</span><span></span></div>
              </div>
            </div>


            <div className="network-4">
              <div className="network-4-inner">
                <div className="network-4-left">
                  <div className="module-title">
                    <Text
                      bgGradient='linear(to-r, #619BEB, #FFFFFF)'
                      bgClip='text'
                      // fontSize='6xl'
                      fontWeight='extrabold'
                    >
                      Skyrocketing profits on your Infrastructure
                    </Text>
                  </div>
                  <div className="network-desc">
                    Earn unprecedented profits on your GPUs and CPUs
                  </div>
                  <div className="network-4-content">
                    <ul>
                      <li>
                        <div>Earn 15x more providing AI compute</div>
                        <div>
                          Earn significantly more on your GPU compute compared to even the best crypto mining pools.
                        </div>
                      </li>
                      <li>
                        <div>Predictable profits</div>
                        <div>Always know how much you will earn and get paid the second the job is done.</div>
                      </li>
                      <li>
                        <div>Fair Rewards</div>
                        <div>The more you invest in your infrastructure, the higher your returns are going to be.</div>
                      </li>
                    </ul>
                  </div>
                  <div className="network-4-bottom">
                    <table width="100%" border={0} cellSpacing={0} cellPadding={2}>
                      <tbody>
                        <tr>
                          <td>Chip</td>
                          <td>RTX 4090</td>
                          <td>RTX 4090</td>
                        </tr>
                        <tr>
                          <td>Hashrate</td>
                          <td>xx</td>
                          <td>118.07 MH/s 328W</td>
                        </tr>
                        <tr>
                          <td>TeraFLOPS</td>
                          <td>82.58</td>
                          <td>82.58</td>
                        </tr>
                        <tr>
                          <td>Memory</td>
                          <td>24GB</td>
                          <td>24GB</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="network-4-right">
                  <div className="network-4-right-1">Earn 1,500% more</div>
                  <div className="network-4-right-2">$375.3</div>
                  <div className="network-4-right-3">$25.2</div>
                  <div className="network-4-right-4">$12.51 Daily</div>
                  <div className="network-4-right-5">$0.84 Daily</div>
                </div>
              </div>
              
              
            </div>
        </Box>
    );
  }