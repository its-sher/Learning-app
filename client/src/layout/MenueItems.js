import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import Cookies from 'js-cookie';
const { decrypt } = require('../helpers/encryption-decryption');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const { SubMenu } = Menu;
var UserRole = [];

const MenuItems = ({ darkMode, toggleCollapsed, topMenu }) => {
  const { path } = useRouteMatch();

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');
  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );
  const [userRole, setUserRole] = useState();
  useEffect(() => {
    var enc_userDetail = Cookies.get('UserDetail');
    var response = decrypt(enc_userDetail);
    console.log(response);
    if (response?.login == true) {
      const UserInfo = response?.sessdata?.user?.[0];
      const GetRole = UserInfo?.user_role?.toUpperCase();
      setUserRole(GetRole);
      const modules = UserInfo?.permissions?.[GetRole].MODULES;
      UserRole = modules;
    }
  }, []);

  const onOpenChange = keys => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = item => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
      gutter={30}
      className="custmblock"
    >
      <>
        {/* {UserRole['POSTS'] !== undefined ? (
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/users/pin-list`}>
                  <i class="fa fa-thumb-tack" style={{ fontSize: '20px', rotate: '30deg' }}></i>
                </NavLink>
              )
            }
            key="pins"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/users/add-pins`}>
              Pins
            </NavLink>
          </Menu.Item>
        ) : (
          ''
        )} */}
        {UserRole['DASHBOARD'] !== undefined ? (
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/users/customer-lislt`}>
                  <FeatherIcon icon="home" />
                </NavLink>
              )
            }
            key="h_dashboard"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/users/add-pins`}>
              Home Dashboard
            </NavLink>
          </Menu.Item>
        ) : (
          ''
        )}

        {UserRole['DASHBOARD'] !== undefined ? (
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/users/customer-listl`}>
                  <FeatherIcon icon="file-text" />
                </NavLink>
              )
            }
            key="file_manager"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/users/customer-listl`}>
              File Manager
            </NavLink>
          </Menu.Item>
        ) : (
          ''
        )}

        {/* {UserRole['POSTS'] !== undefined ? (
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/users/Board`}>
                  <FeatherIcon icon="layers" />
                </NavLink>
              )
            }
            key="trelloboard"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/users/Board`}>
              Board
            </NavLink>
            
          </Menu.Item>
        ) : (
          ''
        )} */}

        {/* {UserRole['POSTS'] !== undefined ? (
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/users/Schedule`}>
                  <i class="fa fa-calendar" aria-hidden="true"></i>
                </NavLink>
              )
            }
            key="schedule"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/users/Schedule`}>
              Schedule
            </NavLink>
          
          </Menu.Item>
        ) : (
          ''
        )} */}
        {/* {UserRole['POSTS'] !== undefined ? (
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/users/form-builder`}>
                  <i class="fa fa-gears" aria-hidden="true"></i>
                </NavLink>
              )
            }
            key="form-builder"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/users/form-builder`}>
              Form UI
            </NavLink>
          </Menu.Item>
        ) : (
          ''
        )} */}

        {(UserRole['SOCIAL_ACCOUNTS'] !== undefined && userRole == 'SUPER_ADMIN') || userRole == 'CLIENT' ? (
          <SubMenu key="manage_test" icon={!topMenu && <FeatherIcon icon="airplay" />} title="Manage Tests">
            {userRole == 'CLIENT' || userRole == 'SUPER_ADMIN' ? (
              <>
                <Menu.Item key="quizzes">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/quizzes`}>
                    Quizzes
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="exams">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/exams`}>
                    Exams
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="quiz_types">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/Pinterestk`}>
                    Quiz Types
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="exam_types">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/configurationk`}>
                    Exam Types
                  </NavLink>
                </Menu.Item>
              </>
            ) : (
              ''
            )}
          </SubMenu>
        ) : (
          ''
        )}
        {(UserRole['SOCIAL_ACCOUNTS'] !== undefined && userRole == 'SUPER_ADMIN') || userRole == 'CLIENT' ? (
          <SubMenu key="manage_learning" icon={!topMenu && <FeatherIcon icon="award" />} title="Manage Learning">
            {userRole == 'CLIENT' || userRole == 'SUPER_ADMIN' ? (
              <>
                <Menu.Item key="practicesets">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/default-imagek`}>
                    Practice Sets
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="lessons">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/default-linkk`}>
                    Lessons
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="videos">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/Pinterestk`}>
                    Videos
                  </NavLink>
                </Menu.Item>
              </>
            ) : (
              ''
            )}
          </SubMenu>
        ) : (
          ''
        )}

        {(UserRole['SOCIAL_ACCOUNTS'] !== undefined && userRole == 'SUPER_ADMIN') || userRole == 'CLIENT' ? (
          <SubMenu key="question_bank" icon={!topMenu && <FeatherIcon icon="help-circle" />} title="Question Bank">
            {userRole == 'CLIENT' || userRole == 'SUPER_ADMIN' ? (
              <>
                <Menu.Item key="questions">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/question`}>
                    Questions
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="imp_questions">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/default-linkgg`}>
                    Important Questions
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="comprehensions">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/Pinterestgg`}>
                    Comprehensions
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="questions">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/default-imagegg`}>
                    Question Types
                  </NavLink>
                </Menu.Item>
              </>
            ) : (
              ''
            )}
          </SubMenu>
        ) : (
          ''
        )}
        {UserRole['POSTS'] !== undefined ? (
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/users/pin-listgg`}>
                  <FeatherIcon icon="file" />
                </NavLink>
              )
            }
            key="lesson_bank"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/users/add-pinsgg`}>
              Lessons Bank
            </NavLink>
          </Menu.Item>
        ) : (
          ''
        )}
        {UserRole['POSTS'] !== undefined ? (
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/users/pin-listgg`}>
                  <FeatherIcon icon="play-circle" />
                </NavLink>
              )
            }
            key="video_bank"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/users/add-pinsgg`}>
              Video Bank
            </NavLink>
          </Menu.Item>
        ) : (
          ''
        )}
        {(UserRole['SOCIAL_ACCOUNTS'] !== undefined && userRole == 'SUPER_ADMIN') || userRole == 'CLIENT' ? (
          <SubMenu key="monetization" icon={!topMenu && <FeatherIcon icon="dollar-sign" />} title="Monetization">
            {userRole == 'CLIENT' || userRole == 'SUPER_ADMIN' ? (
              <>
                <Menu.Item key="plans">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/plans`}>
                    Plans
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="subsriptions">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/subscriptions`}>
                    Subsriptions
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="payments">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/payments`}>
                    Payments
                  </NavLink>
                </Menu.Item>
              </>
            ) : (
              ''
            )}
          </SubMenu>
        ) : (
          ''
        )}
        {(UserRole['SOCIAL_ACCOUNTS'] !== undefined && userRole == 'SUPER_ADMIN') || userRole == 'CLIENT' ? (
          <SubMenu key="manage_users" icon={!topMenu && <FeatherIcon icon="users" />} title="Manage Users">
            {userRole == 'CLIENT' || userRole == 'SUPER_ADMIN' ? (
              <>
                <Menu.Item key="users">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/users`}>
                    Users
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="user_groups">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/usergroup`}>
                    User Groups
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="roles">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/Pinterestgg`}>
                    Roles & Permissions
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="import_users">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/Pinterestgg`}>
                    Import Users
                  </NavLink>
                </Menu.Item>
              </>
            ) : (
              ''
            )}
          </SubMenu>
        ) : (
          ''
        )}
        {(UserRole['SOCIAL_ACCOUNTS'] !== undefined && userRole == 'SUPER_ADMIN') || userRole == 'CLIENT' ? (
          <SubMenu key="manage_categories" icon={!topMenu && <FeatherIcon icon="layers" />} title="Manage Categories">
            {userRole == 'CLIENT' || userRole == 'SUPER_ADMIN' ? (
              <>
                <Menu.Item key="categories">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/categorieslist`}>
                    Categories
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="sub_categories">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/sub-category`}>
                    Sub Categories
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="tags">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/tags`}>
                    Tags
                  </NavLink>
                </Menu.Item>
              </>
            ) : (
              ''
            )}
          </SubMenu>
        ) : (
          ''
        )}
        {(UserRole['SOCIAL_ACCOUNTS'] !== undefined && userRole == 'SUPER_ADMIN') || userRole == 'CLIENT' ? (
          <SubMenu key="manage_subjects" icon={!topMenu && <FeatherIcon icon="book-open" />} title="Manage Subjects">
            {userRole == 'CLIENT' || userRole == 'SUPER_ADMIN' ? (
              <>
                <Menu.Item key="sections">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/sectionlist`}>
                    Sections
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="skills">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/skill-list`}>
                    Skills
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="topics">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/topiclist`}>
                    Topics
                  </NavLink>
                </Menu.Item>
              </>
            ) : (
              ''
            )}
          </SubMenu>
        ) : (
          ''
        )}

        {(UserRole['SOCIAL_ACCOUNTS'] !== undefined && userRole == 'SUPER_ADMIN') || userRole == 'CLIENT' ? (
          <SubMenu key="settings" icon={!topMenu && <FeatherIcon icon="settings" />} title="Settings">
            {userRole == 'CLIENT' || userRole == 'SUPER_ADMIN' ? (
              <>
                <Menu.Item key="g_settings">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/default-imagegg`}>
                    General Settings
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="hpage_settings">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/default-linkgg`}>
                    Home Page Settings
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="e_settings">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/Pinterestgg`}>
                    Email Settings
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="p_settings">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/Pinterestgg`}>
                    Payment Settings
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="b_t_settings">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/Pinterestgg`}>
                    Billing & Tax Settings
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="t_settings">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/Pinterestg`}>
                    Theme Settings
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="m_settings">
                  <NavLink onClick={toggleCollapsed} to={`${path}/users/Pinterestgg`}>
                    Maintenance Settings
                  </NavLink>
                </Menu.Item>
              </>
            ) : (
              ''
            )}
          </SubMenu>
        ) : (
          ''
        )}
        {/* <Menu.Item
          icon={
            !topMenu && (
              <NavLink className="menuItem-iocn" to={`${path}/users/social_accounts`}>
                <i class="fa fa-pinterest" style={{ color: '#ff0000' }}></i>
              </NavLink>
            )
          }
          key="social_accounts2"
        >
          <NavLink onClick={toggleCollapsed} to={`${path}/users/social_accounts`}>
            Pinterest
          </NavLink>
        </Menu.Item> */}
      </>
    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
